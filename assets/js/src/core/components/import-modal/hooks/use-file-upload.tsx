/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback } from 'react'
import axios from 'axios'
import { isNil } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseFileUploadProps {
  action: string
  headers?: Record<string, string>
  data?: Record<string, any>
  fileKey?: string
  filesKey?: string
  onUploadSuccess?: (response: any, file: File) => void
  onUploadError?: (error: Error, file: File) => void
}

export type FileUploadStatus = 'normal' | 'active' | 'success' | 'exception'

export interface FileUploadState {
  progress: number
  status: FileUploadStatus
}

interface UseFileUploadReturn {
  uploadProgress: number
  uploadStatus: FileUploadStatus
  loading: boolean
  isUploading: boolean
  upload: (file: File) => Promise<void>
  uploadMultiple: (entries: Array<{ id: string, file: File }>) => Promise<void>
  fileUploadStates: Record<string, FileUploadState>
  resetUploadState: () => void
}

export const useFileUpload = ({
  action,
  headers,
  data,
  fileKey = 'file',
  filesKey = 'files[]',
  onUploadSuccess,
  onUploadError
}: UseFileUploadProps): UseFileUploadReturn => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatus>('normal')
  const [loading, setLoading] = useState(false)
  const [fileUploadStates, setFileUploadStates] = useState<Record<string, FileUploadState>>({})

  const resetUploadState = useCallback(() => {
    setUploadProgress(0)
    setUploadStatus('normal')
    setLoading(false)
    setFileUploadStates({})
  }, [])

  const upload = useCallback(async (file: File): Promise<void> => {
    setLoading(true)
    setUploadStatus('active')
    setUploadProgress(0)

    const formData = new FormData()
    formData.append(fileKey, file)

    if (!isNil(data)) {
      Object.keys(data).forEach(key => {
        const value = data[key]
        formData.append(key, String(value))
      })
    }

    try {
      const response = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        },
        onUploadProgress: (progressEvent) => {
          if (!isNil(progressEvent.total)) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percent)
          }
        }
      })

      setUploadStatus('success')
      setLoading(false)

      if (!isNil(onUploadSuccess)) {
        onUploadSuccess(response.data, file)
      }
    } catch (error: any) {
      setUploadStatus('exception')
      setLoading(false)

      if (!isNil(onUploadError)) {
        onUploadError(error instanceof Error ? error : new Error(String(error)), file)
      }

      if (!isNil(error.response)) {
        trackError(new ApiError({ data: error.response.data }))
      } else {
        console.error('Upload error:', error)
      }

      throw error
    }
  }, [action, headers, data, fileKey, onUploadSuccess, onUploadError])

  const uploadMultiple = useCallback(async (entries: Array<{ id: string, file: File }>): Promise<void> => {
    setLoading(true)

    for (const { id, file } of entries) {
      setFileUploadStates(prev => ({ ...prev, [id]: { progress: 0, status: 'active' } }))

      const formData = new FormData()
      formData.append(filesKey, file)

      if (!isNil(data)) {
        Object.keys(data).forEach(key => {
          formData.append(key, String(data[key]))
        })
      }

      try {
        const response = await axios.post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...headers
          },
          onUploadProgress: (progressEvent) => {
            if (!isNil(progressEvent.total)) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setFileUploadStates(prev => ({ ...prev, [id]: { ...prev[id], progress: percent } }))
            }
          }
        })

        setFileUploadStates(prev => ({ ...prev, [id]: { progress: 100, status: 'success' } }))

        if (!isNil(onUploadSuccess)) {
          onUploadSuccess(response.data, file)
        }
      } catch (error: any) {
        setFileUploadStates(prev => ({ ...prev, [id]: { ...prev[id], status: 'exception' } }))

        if (!isNil(onUploadError)) {
          onUploadError(error instanceof Error ? error : new Error(String(error)), file)
        }

        if (!isNil(error.response)) {
          trackError(new ApiError({ data: error.response.data }))
        } else {
          console.error('Upload error:', error)
        }

        setLoading(false)
        throw error
      }
    }

    setLoading(false)
  }, [action, headers, data, filesKey, onUploadSuccess, onUploadError])

  return {
    uploadProgress,
    uploadStatus,
    loading,
    isUploading: uploadStatus === 'active',
    upload,
    uploadMultiple,
    fileUploadStates,
    resetUploadState
  }
}

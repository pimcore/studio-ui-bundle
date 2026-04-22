/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

export interface FileEntry {
  id: string
  file: File
}

export interface ImportModalProps {
  action: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  uploadButtonLabel?: string
  browseButtonLabel?: string
  dragDropLabel?: string
  accept?: string
  acceptMimeTypes?: string[]
  validateFile?: (file: File) => boolean
  onValidationError?: (file: File) => void
  maxFileSize?: number
  headers?: Record<string, string>
  data?: Record<string, any>
  /**
     * fileKey is used when uploading a single file.
     * The payload will be: `{ [fileKey]: File }`.
     * Defaults to 'file'.
     */
  fileKey?: string
  /**
     * filesKey is used when uploading multiple files.
     * The payload will be: `{ [filesKey]: File, [filesKey]: File, ... }`.
     * Defaults to 'files[]'.
     */
  filesKey?: string
  onUploadSuccess?: (response: any, file: File) => void
  onUploadError?: (error: Error, file: File) => void
  showSuccessMessage?: boolean
  successMessage?: React.ReactNode
  multiple?: boolean
  children?: React.ReactNode
}

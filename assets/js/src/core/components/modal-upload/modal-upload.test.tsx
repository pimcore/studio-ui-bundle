/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Upload, type UploadProps } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
import { ModalUpload, type ModalUploadPropsBase } from './modal-upload'

const setIsModalOpen = jest.fn()
const resolveConflicts = jest.fn()
const uploadContext = {
  setIsModalOpen,
  setShowProcessing: jest.fn(),
  setShowUploadError: jest.fn(),
  setFileList: jest.fn(),
  setCheckProgress: jest.fn(),
  cancelCheckRef: { current: null },
  fileList: []
}

jest.mock('rc-upload/es/request', () => ({ __esModule: true, default: jest.fn() }))

jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({ api: { endpoints: {} } }))

jest.mock('@sdk/app', () => ({ useAppDispatch: () => jest.fn() }))

jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({
  useSettings: () => ({ upload_max_filesize: 1024 })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn() })
}))

jest.mock('./provider/upload-modal-provider/use-upload-modal-context', () => ({
  useUploadModalContext: () => uploadContext
}))

jest.mock('@Pimcore/components/hooks/use-target-folder-id', () => ({
  useTargetFolderId: () => ({ targetFolderId: 1 })
}))

jest.mock('./hooks/use-upload-conflict-handler', () => ({
  useUploadConflictHandler: () => ({
    resolveConflicts,
    cancelCheck: jest.fn(),
    shouldSkipFile: () => false,
    hasCheckError: () => false,
    getReplaceId: () => undefined,
    reset: jest.fn(),
    cleanupProcessedFiles: jest.fn(),
    getCheckError: jest.fn()
  })
}))

jest.mock('./utils/upload-queue', () => ({ uploadQueue: { enqueue: jest.fn() } }))

jest.mock('./utils/resolve-upload-action', () => ({ resolveUploadAction: jest.fn() }))

jest.mock('@Pimcore/modules/app/error-handler', () => ({ __esModule: true, default: jest.fn(), ApiError: jest.fn() }))

type BeforeUpload = NonNullable<UploadProps['beforeUpload']>

const file = { uid: 'rc-1', name: 'photo.jpg', size: 10 } as unknown as RcFile

const renderBeforeUpload = (props: Pick<ModalUploadPropsBase, 'shouldUploadFile' | 'skipConflictCheck'>): BeforeUpload => {
  let captured: UploadProps = {}
  const captureUpload = (uploadProps: UploadProps): null => {
    captured = uploadProps
    return null
  }

  render(
    <ModalUpload
      action="/assets/7/replace"
      uploadComponent={ captureUpload }
      { ...props }
    />
  )

  return captured.beforeUpload!
}

describe('ModalUpload shouldUploadFile', () => {
  beforeEach(() => {
    setIsModalOpen.mockReset()
    resolveConflicts.mockReset().mockResolvedValue(false)
  })

  it('drops the file before the check or upload starts when it resolves to false', async () => {
    const beforeUpload = renderBeforeUpload({ shouldUploadFile: async () => false })

    await expect(beforeUpload(file, [file])).resolves.toBe(Upload.LIST_IGNORE)
    expect(setIsModalOpen).not.toHaveBeenCalled()
    expect(resolveConflicts).not.toHaveBeenCalled()
  })

  it('uploads the file when it resolves to true', async () => {
    const beforeUpload = renderBeforeUpload({ shouldUploadFile: async () => true, skipConflictCheck: true })

    await expect(beforeUpload(file, [file])).resolves.toBe(true)
  })

  it('uploads the file as before when it is not set', async () => {
    const beforeUpload = renderBeforeUpload({ skipConflictCheck: true })

    await expect(beforeUpload(file, [file])).resolves.toBe(true)
  })
})

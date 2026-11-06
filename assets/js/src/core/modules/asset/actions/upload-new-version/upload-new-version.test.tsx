/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const triggerUpload = jest.fn()
const confirm = jest.fn()
const warning = jest.fn()
const dispatch = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, unknown>) => [key, ...Object.values(values ?? {}).filter(value => typeof value === 'string')].join(' ')
  })
}))

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ warning })
}))

jest.mock('@Pimcore/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context', () => ({
  useUploadModalContext: () => ({ triggerUpload })
}))

jest.mock('@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission', () => ({
  useTreePermission: () => ({ isTreeActionAllowed: () => true })
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({
  api: { endpoints: { assetGetTree: { initiate: () => ({ type: 'assetGetTree' }) } } }
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  updateNodeData: (payload: unknown) => ({ type: 'updateNodeData', payload }),
  setNodeFetchingInAllTrees: (payload: unknown) => ({ type: 'setNodeFetchingInAllTrees', payload })
}))

jest.mock('@Pimcore/modules/asset/tree/utils/transform-api-data-to-node', () => ({
  transformApiDataToNode: jest.fn()
}))

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useUploadNewVersion } from './upload-new-version'
// eslint-disable-next-line import/first
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
// eslint-disable-next-line import/first
import { type RcFile } from 'antd/es/upload/interface'

interface UploadProps {
  action: string
  shouldUploadFile?: (file: RcFile) => Promise<boolean>
  onSuccess: (files: Array<{ response?: { data?: unknown } }>) => Promise<void>
}

const asset = { id: 7, type: 'image', filename: 'example.png', permissions: {} } as unknown as Asset

const treeNode = {
  id: '7',
  type: 'image',
  label: 'Custom label',
  realKey: 'example.png',
  permissions: {}
} as unknown as TreeNodeProps

const file = (name: string): RcFile => ({ name }) as unknown as RcFile

const clickItem = (item: unknown): void => {
  (item as { onClick: () => void }).onClick()
}

const lastUploadProps = (): UploadProps => triggerUpload.mock.calls[triggerUpload.mock.calls.length - 1][0]

const lastConfirmConfig = (): { content: string, onOk: () => void, onCancel: () => void } => confirm.mock.calls[confirm.mock.calls.length - 1][0]

describe('useUploadNewVersion', () => {
  beforeEach(() => {
    triggerUpload.mockReset()
    confirm.mockReset()
    warning.mockReset()
    dispatch.mockReset().mockReturnValue(Object.assign(Promise.resolve({ data: { items: [] } }), { unsubscribe: jest.fn() }))
  })

  it('uploads without asking when the new file has the same extension', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionContextMenuItem(asset))

    await expect(lastUploadProps().shouldUploadFile?.(file('photo.png'))).resolves.toBe(true)
    expect(confirm).not.toHaveBeenCalled()
  })

  it('asks before uploading a file with a different extension and names the old and new filename', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionContextMenuItem(asset))

    const shouldUpload = lastUploadProps().shouldUploadFile?.(file('photo.jpg'))

    expect(lastConfirmConfig().content).toBe('asset.upload-new-version.rename-confirmation.message jpg example.png example.jpg')
    lastConfirmConfig().onOk()
    await expect(shouldUpload).resolves.toBe(true)
  })

  it('does not upload when the user cancels the rename dialog', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionContextMenuItem(asset))

    const shouldUpload = lastUploadProps().shouldUploadFile?.(file('photo.jpg'))
    lastConfirmConfig().onCancel()

    await expect(shouldUpload).resolves.toBe(false)
  })

  it('compares against the real filename from the tree, not the display label', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionTreeContextMenuItem(treeNode))

    await expect(lastUploadProps().shouldUploadFile?.(file('photo.png'))).resolves.toBe(true)
    expect(lastUploadProps().action).toBe('/pimcore-studio/api/assets/7/replace')
  })

  it('warns after the upload when the returned filename differs from the previous one', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionContextMenuItem(asset))

    await lastUploadProps().onSuccess([{ response: { data: 'example_copy.jpg' } }])

    expect(warning).toHaveBeenCalledWith('asset.upload-new-version.renamed example.png example_copy.jpg')
  })

  it('does not warn when the filename stayed the same', async () => {
    const { result } = renderHook(() => useUploadNewVersion())
    clickItem(result.current.uploadNewVersionContextMenuItem(asset))

    await lastUploadProps().onSuccess([{ response: { data: 'example.png' } }])

    expect(warning).not.toHaveBeenCalled()
  })

  it('keeps the previous behaviour when no current filename is passed', async () => {
    const onFinish = jest.fn()
    const { result } = renderHook(() => useUploadNewVersion())
    result.current.uploadNewVersion(7, onFinish)

    expect(lastUploadProps().shouldUploadFile).toBeUndefined()
    await lastUploadProps().onSuccess([{ response: { data: 'example.jpg' } }])
    expect(warning).not.toHaveBeenCalled()
    expect(onFinish).toHaveBeenCalled()
  })
})

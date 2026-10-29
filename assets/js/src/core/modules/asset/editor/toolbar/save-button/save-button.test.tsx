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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditorToolbarSaveButton } from './save-button'
import { useAssetDraft } from '../../../hooks/use-asset-draft'
import { useAssetUpdateByIdMutation } from '../../../asset-api-slice-enhanced'
import { useSaveSchedules } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'

const mockSaveAsset = jest.fn()
const mockSaveSchedules = jest.fn()
const mockRemoveTrackedChanges = jest.fn()
const mockMessageSuccess = jest.fn()
const mockExecuteProcessors = jest.fn()
const mockPublish = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick, disabled }: { children: React.ReactNode, onClick: () => void, disabled: boolean }) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
      type="button"
    >{children}</button>
  )
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ success: mockMessageSuccess }) }))
jest.mock('../../../hooks/use-asset-draft', () => ({ useAssetDraft: jest.fn() }))
jest.mock('../../../asset-api-slice-enhanced', () => ({ useAssetUpdateByIdMutation: jest.fn() }))
jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules', () => ({
  useSaveSchedules: jest.fn()
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({ useElementContext: () => ({ id: 5 }) }))
jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({ checkElementPermission: () => true }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ executeProcessors: mockExecuteProcessors }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'Asset/ProcessorRegistry/SaveDataProcessor': 'save-data-processor' }
}))
jest.mock('@Pimcore/modules/asset/services/processors/asset-save-data-processor-registry', () => ({
  AssetSaveDataContext: class {
    constructor (public assetId: number, public updateData: Record<string, unknown>) {}
  }
}))
jest.mock('@Pimcore/lib/event-bus', () => ({ eventBus: { publish: (event: unknown) => mockPublish(event) } }))
jest.mock('@Pimcore/lib/event-bus/event-types', () => ({ eventTypes: { 'asset:editor:post-update': 'asset:editor:post-update' } }))
jest.mock('@Pimcore/modules/app/hook/use-handle-keybindings', () => ({ useHandleKeyBindings: jest.fn() }))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => jest.fn() }))
jest.mock('@Pimcore/modules/asset/asset-draft-slice', () => ({ setModificationDate: jest.fn() }))

const mockDraft = (changes: Record<string, boolean>, draftData: Record<string, unknown> = {}): void => {
  (useAssetDraft as jest.Mock).mockReturnValue({
    asset: { type: 'image', permissions: {}, changes },
    properties: undefined,
    customMetadata: undefined,
    customSettings: undefined,
    imageSettings: undefined,
    textData: undefined,
    removeTrackedChanges: mockRemoveTrackedChanges,
    ...draftData
  })
}

const clickSave = (): void => {
  fireEvent.click(screen.getByRole('button'))
}

describe('Asset EditorToolbarSaveButton', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    ;(useAssetUpdateByIdMutation as jest.Mock).mockReturnValue([
      mockSaveAsset,
      { isLoading: false, isError: false, error: undefined }
    ])
    ;(useSaveSchedules as jest.Mock).mockReturnValue({
      saveSchedules: mockSaveSchedules,
      isLoading: false,
      isError: false,
      error: undefined
    })
    mockSaveAsset.mockResolvedValue({ data: { modificationDate: 123 } })
    mockSaveSchedules.mockResolvedValue(true)
  })

  it('does not send an asset request when nothing is tracked and still confirms the save', async () => {
    mockDraft({})
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalledWith('save-success') })
    expect(mockSaveAsset).not.toHaveBeenCalled()
    expect(mockPublish).not.toHaveBeenCalled()
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
  })

  it('does not send an asset request for a schedules-only save but saves the schedules', async () => {
    mockDraft({ schedules: true })
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalledWith('save-success') })
    expect(mockSaveAsset).not.toHaveBeenCalled()
    expect(mockSaveSchedules).toHaveBeenCalledTimes(1)
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
  })

  it('does not confirm a schedules-only save when the schedules request failed', async () => {
    mockSaveSchedules.mockResolvedValue(false)
    mockDraft({ schedules: true })
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockSaveSchedules).toHaveBeenCalled() })
    await Promise.resolve()
    expect(mockMessageSuccess).not.toHaveBeenCalled()
  })

  it('sends the tracked data and resets only the change types that were sent', async () => {
    mockDraft(
      { customSettings: true, properties: true },
      { customSettings: [{ key: 'a' }], properties: [] }
    )
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalledWith('save-success') })
    expect(mockSaveAsset).toHaveBeenCalledWith({
      id: 5,
      body: { data: { properties: [], customSettings: [{ key: 'a' }] } }
    })
    expect(mockRemoveTrackedChanges).toHaveBeenCalledWith(
      ['properties', 'customSettings'],
      expect.objectContaining({ properties: [], customSettings: [{ key: 'a' }] })
    )
    expect(mockPublish).toHaveBeenCalledTimes(1)
  })

  it('does not send an empty request for a change flag without draft data and keeps the flag', async () => {
    mockDraft({ customMetadata: true })
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalled() })
    expect(mockSaveAsset).not.toHaveBeenCalled()
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
  })

  it('sends a request when a save data processor adds data to an otherwise empty update', async () => {
    mockExecuteProcessors.mockImplementation((context: { updateData: Record<string, unknown> }) => {
      context.updateData.customSettings = [{ key: 'from-processor' }]
    })
    mockDraft({})
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalled() })
    expect(mockSaveAsset).toHaveBeenCalledWith({
      id: 5,
      body: { data: { customSettings: [{ key: 'from-processor' }] } }
    })
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
  })

  it('keeps the change flag of a section that a save data processor removed from the update', async () => {
    mockExecuteProcessors.mockImplementation((context: { updateData: Record<string, unknown> }) => {
      context.updateData.properties = undefined
    })
    mockDraft(
      { customSettings: true, properties: true },
      { customSettings: [{ key: 'a' }], properties: [{ key: 'p' }] }
    )
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalled() })
    expect(mockRemoveTrackedChanges).toHaveBeenCalledWith(['customSettings'], expect.anything())
  })

  it('does not reset anything when every collected section was removed by a processor', async () => {
    mockExecuteProcessors.mockImplementation((context: { updateData: Record<string, unknown> }) => {
      context.updateData.properties = undefined
    })
    mockDraft({ properties: true }, { properties: [{ key: 'p' }] })
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockMessageSuccess).toHaveBeenCalled() })
    expect(mockSaveAsset).not.toHaveBeenCalled()
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
  })

  it('keeps the tracked changes and shows no confirmation when the asset request failed', async () => {
    mockSaveAsset.mockResolvedValue({ error: { status: 500 } })
    mockDraft({ properties: true }, { properties: [] })
    render(<EditorToolbarSaveButton />)

    clickSave()

    await waitFor(() => { expect(mockSaveAsset).toHaveBeenCalled() })
    await Promise.resolve()
    expect(mockRemoveTrackedChanges).not.toHaveBeenCalled()
    expect(mockMessageSuccess).not.toHaveBeenCalled()
    expect(mockPublish).not.toHaveBeenCalled()
  })
})

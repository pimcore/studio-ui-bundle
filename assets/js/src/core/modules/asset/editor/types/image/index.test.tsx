/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { type IElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

const mockRegisteredTabs: IEditorTab[] = []
let mockOnInit: (() => void) | undefined
let mockState: unknown = {}

jest.mock('@Pimcore/app/module-system/module-system', () => ({
  moduleSystem: {
    registerModule: (module: { onInit: () => void }) => { mockOnInit = module.onInit }
  }
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ register: (tab: IEditorTab) => { mockRegisteredTabs.push(tab) } })
  }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => mockState }
}))

jest.mock('@Pimcore/modules/app/settings/settings-slice', () => ({
  getAdminSettings: (state: { settings?: { adminSettings?: unknown } }) => state.settings?.adminSettings
}))

jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/edit/edit-container', () => ({ EditTabContainer: () => null }))
jest.mock('./tab-manager/tabs/preview/preview-container', () => ({ PreviewContainer: () => null }))
jest.mock('@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions', () => ({}))
jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions', () => ({}))

describe('image editor edit tab', () => {
  let editTab: IEditorTab | undefined
  const element = {} as unknown as IElementDraft

  beforeAll(async () => {
    await import('./index')
    mockOnInit!()
    editTab = mockRegisteredTabs.find(tab => tab.key === 'edit')
  })

  const isHidden = (): boolean => editTab?.hidden?.(element) ?? false

  it('is registered', () => {
    expect(editTab).toBeDefined()
  })

  it('is hidden when assets.hide_edit_image is true', () => {
    mockState = { settings: { adminSettings: { assets: { hide_edit_image: true, disable_tree_preview: false } } } }
    expect(isHidden()).toBe(true)
  })

  it('is shown when assets.hide_edit_image is false', () => {
    mockState = { settings: { adminSettings: { assets: { hide_edit_image: false, disable_tree_preview: false } } } }
    expect(isHidden()).toBe(false)
  })

  it('is shown when admin settings are not loaded', () => {
    mockState = { settings: {} }
    expect(isHidden()).toBe(false)
  })
})

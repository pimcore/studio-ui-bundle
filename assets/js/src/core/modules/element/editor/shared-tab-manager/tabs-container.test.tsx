/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const rename = jest.fn()
const checkElementPermission = jest.fn()
const keyBindings: Record<string, () => void> = {}
let element: Record<string, unknown> | null = null

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getTabs: () => [] })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 5, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({
  useElementDraft: () => ({ element })
}))

jest.mock('@Pimcore/modules/app/hook/use-handle-keybindings', () => ({
  useHandleKeyBindings: (callback: () => void, actionName: string) => { keyBindings[actionName] = callback }
}))

jest.mock('@Pimcore/modules/element/actions/rename/use-rename', () => ({
  useRename: () => ({ rename })
}))

jest.mock('@Pimcore/modules/element/actions/unpublish/use-unpublish', () => ({
  useUnpublish: () => ({ unpublishTreeNode: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/actions/refresh-element/use-element-refresh', () => ({
  useElementRefresh: () => ({ refreshElement: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree', () => ({
  useLocateInTree: () => ({ locateInTree: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/utils/workflow-availability', () => ({
  isWorkflowAvailable: () => true
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: (...args: unknown[]) => checkElementPermission(...args)
}))

jest.mock('@Pimcore/modules/element/editor/tabs/editor-tabs', () => ({
  EditorTabs: () => null
}))

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tab-manager-context', () => ({
  TabManagerProvider: ({ children }: { children: React.ReactNode }) => children
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { TabsContainer } from './tabs-container'
// eslint-disable-next-line import/first
import { type ElementEditorType } from '@Pimcore/modules/element/editor/services/type-registry'

const renderTabsContainer = (): void => {
  render(<TabsContainer elementEditorType={ { tabManagerServiceId: 'tab-manager' } as unknown as ElementEditorType } />)
}

const buildElement = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
  id: 5,
  key: 'car',
  isLocked: false,
  permissions: {},
  customAttributes: {
    icon: null,
    tooltip: null,
    additionalIcons: [],
    key: 'car - test',
    additionalCssClasses: []
  },
  ...overrides
})

describe('TabsContainer rename key binding', () => {
  beforeEach(() => {
    rename.mockReset()
    checkElementPermission.mockReset().mockReturnValue(true)
    element = buildElement()
  })

  it('opens the rename dialog with the real key, not the custom attribute key', () => {
    renderTabsContainer()

    keyBindings.rename()

    expect(rename).toHaveBeenCalledWith(5, 'car')
  })

  it('does not open the rename dialog when the element is locked or the rename permission is missing', () => {
    element = buildElement({ isLocked: true })
    renderTabsContainer()
    keyBindings.rename()

    element = buildElement()
    checkElementPermission.mockReturnValue(false)
    renderTabsContainer()
    keyBindings.rename()

    expect(rename).not.toHaveBeenCalled()
  })
})

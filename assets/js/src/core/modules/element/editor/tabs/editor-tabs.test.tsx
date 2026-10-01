/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// EditorTabs is shared by the Asset, Document, and Data Object editors; its tab-selection
// logic never branches on element type, so `elementType: 'data-object'` below is incidental
// and this coverage applies equally to all three.
const mockSetActiveTab = jest.fn()
const mockElementDraftState: { activeTab: string | null, element: Partial<IElementDraft> } = {
  activeTab: null,
  element: {}
}

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({
  useElementDraft: () => ({
    activeTab: mockElementDraftState.activeTab,
    setActiveTab: mockSetActiveTab,
    element: mockElementDraftState.element
  })
}))

jest.mock('@Pimcore/modules/element/editor/tabs/hooks/use-detach-tab', () => ({
  useDetachTab: () => ({ detachWidget: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/components/element-toolbar/element-toolbar', () => ({
  ElementToolbar: () => null
}))

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the tab selection asserted below matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// The icon component resolves its registry through the DI container, which only exists in
// the running app, and is irrelevant to what is asserted here.
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

// Relies on ResizeObserver, which jsdom does not implement, and is irrelevant to what is
// asserted here.
jest.mock('@Pimcore/utils/hooks/use-element-resize', () => ({
  __esModule: true,
  default: () => ({ width: 0, height: 0 })
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render } from '@testing-library/react'
// eslint-disable-next-line import/first
import { EditorTabs, type IAdvancedEditorTab } from './editor-tabs'
// eslint-disable-next-line import/first
import { type IElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

const EDIT_TAB: IAdvancedEditorTab = { key: 'edit', label: 'Edit', children: <></>, icon: <></> }
const DEPENDENCIES_TAB: IAdvancedEditorTab = { key: 'dependencies', label: 'Dependencies', children: <></>, icon: <></> }
const WORKFLOW_TAB: IAdvancedEditorTab = {
  key: 'workflow',
  label: 'Workflow',
  children: <></>,
  icon: <></>,
  hidden: (element: Partial<IElementDraft>) => element?.hasWorkflowAvailable !== true
}

describe('EditorTabs', () => {
  beforeEach(() => {
    mockSetActiveTab.mockClear()
    mockElementDraftState.activeTab = null
    mockElementDraftState.element = {}
  })

  it('defaults to the first tab when no tab is active yet', () => {
    render(<EditorTabs items={ [EDIT_TAB, DEPENDENCIES_TAB] } />)

    expect(mockSetActiveTab).toHaveBeenCalledWith('edit')
  })

  it('keeps the active tab when it is still visible', () => {
    mockElementDraftState.activeTab = 'dependencies'

    render(<EditorTabs items={ [EDIT_TAB, DEPENDENCIES_TAB] } />)

    expect(mockSetActiveTab).not.toHaveBeenCalled()
  })

  it('falls back to the first visible tab when the preserved tab is no longer visible', () => {
    mockElementDraftState.activeTab = 'workflow'
    mockElementDraftState.element = { hasWorkflowAvailable: false }

    render(<EditorTabs items={ [EDIT_TAB, WORKFLOW_TAB] } />)

    expect(mockSetActiveTab).toHaveBeenCalledWith('edit')
  })

  it('keeps a preserved tab that is still visible', () => {
    mockElementDraftState.activeTab = 'workflow'
    mockElementDraftState.element = { hasWorkflowAvailable: true }

    render(<EditorTabs items={ [EDIT_TAB, WORKFLOW_TAB] } />)

    expect(mockSetActiveTab).not.toHaveBeenCalled()
  })
})

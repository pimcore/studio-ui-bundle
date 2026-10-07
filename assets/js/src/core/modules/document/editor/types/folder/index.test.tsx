/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const registerTab = jest.fn()
const registerEntry = jest.fn()
const registerButton = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: (serviceId: string) => {
      if (serviceId === 'Document/Editor/Sidebar/FolderSidebarManager') {
        return { registerEntry, registerButton }
      }
      if (serviceId === 'Document/Editor/FolderTabManager') {
        return { register: registerTab }
      }
      throw new Error(`Unexpected service requested: ${serviceId}`)
    }
  }
}))

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions', () => ({
  TAB_DEPENDENCIES: { key: 'dependencies' },
  TAB_NOTES_AND_EVENTS: { key: 'notes-events' },
  TAB_TAGS: { key: 'tags' },
  TAB_WORKFLOW: { key: 'workflow' }
}))

jest.mock('../../shared-tab-manager/sidebar-definitions', () => ({
  SIDEBAR_CONTENT_SETTINGS: { key: 'content-settings' },
  SIDEBAR_NAVIGATION: { key: 'navigation' }
}))

jest.mock('./tab-manager/tabs/properties/properties-container', () => ({
  TAB_FOLDER_PROPERTIES: { key: 'properties' }
}))

// eslint-disable-next-line import/first
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
// eslint-disable-next-line import/first
import './index'

// Regression test for https://github.com/pimcore/platform-version/issues/278:
// document folders must expose the Navigation sidebar so navigation_* properties
// (which the Properties tab deliberately blocks for documents) can still be edited.
describe('document folder editor registration', () => {
  beforeAll(() => {
    moduleSystem.initModules()
  })

  it('registers the navigation sidebar entry for folders', () => {
    const registeredEntryKeys = registerEntry.mock.calls.map(([entry]) => entry.key)

    expect(registeredEntryKeys).toContain('content-settings')
    expect(registeredEntryKeys).toContain('navigation')
  })

  it('registers the folder properties tab', () => {
    const registeredTabKeys = registerTab.mock.calls.map(([tab]) => tab.key)

    expect(registeredTabKeys).toContain('properties')
  })
})

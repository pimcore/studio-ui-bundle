/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isDocumentAutoSaveEnabled } from './document-auto-save'

let mockSettings: Record<string, any> = {}

jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => ({}) }
}))

jest.mock('@Pimcore/modules/app/settings/settings-slice', () => ({
  getSettings: () => mockSettings
}))

describe('isDocumentAutoSaveEnabled', () => {
  it('is disabled when the auto-save interval is 0', () => {
    mockSettings = { document_auto_save_interval: 0 }

    expect(isDocumentAutoSaveEnabled()).toBe(false)
  })

  it('is enabled when an auto-save interval is set', () => {
    mockSettings = { document_auto_save_interval: 60 }

    expect(isDocumentAutoSaveEnabled()).toBe(true)
  })

  it('stays enabled when the backend does not send the setting', () => {
    mockSettings = {}

    expect(isDocumentAutoSaveEnabled()).toBe(true)
  })
})

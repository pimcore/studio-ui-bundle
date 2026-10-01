/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { versionsDataToTableData, type AssetVersionData } from './details-functions'
import { getAssetCategoriesList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/helpers/assetCategoriesHelper'
import { type IAssetVersionField } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'

// Simulate a non-English UI language (pimcore/platform-version#466):
// every translation differs from its key, e.g. t('field') === 'Feld'
jest.mock('i18next', () => ({
  t: (key: string) => (key === 'field' ? 'Feld' : `de:${key}`)
}))
jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/utils/date-time', () => ({ formatDateTime: jest.fn(() => '') }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const createVersionData = (versionCount: number, fileName: string): AssetVersionData => ({
  versionCount,
  baseDataFormatted: {
    fileName,
    creationDate: '1/1/26, 10:00:00 AM',
    modificationDate: '1/1/26, 10:00:00 AM',
    fileSize: '1 KB',
    mimeType: 'image/png',
    dimensions: '100 x 100'
  },
  metadata: new Map([
    ['meta.title.en', {
      key: 'meta.title.en',
      field: 'title',
      metadataType: 'input',
      displayValue: 'Some title',
      language: 'en',
      raw: { name: 'title', language: 'en', type: 'input', data: 'Some title' }
    }]
  ]),
  previewImageUrl: null,
  dataRaw: {
    type: 'image',
    fileName,
    creationDate: 1767258000,
    modificationDate: 1767258000,
    fileSize: 1024,
    mimeType: 'image/png',
    metadata: [{ name: 'title', language: 'en', type: 'input', data: 'Some title' }],
    dimensions: { width: 100, height: 100 }
  }
})

describe('versionsDataToTableData', () => {
  it('keys rows by untranslated structural keys even when the UI language is not English', () => {
    const rows = versionsDataToTableData([createVersionData(1, 'test.png')]) as IAssetVersionField[]

    expect(rows.length).toBeGreaterThan(0)

    rows.forEach(row => {
      expect(row.Field).toBeDefined()
      expect(typeof row.Field.key).toBe('string')
      expect(row['Version 1']).toBeDefined()
      expect(row).not.toHaveProperty('Feld')
      expect(row).not.toHaveProperty('de:version.version 1')
    })
  })

  it('merges multiple versions into shared rows keyed by "Version <count>"', () => {
    const rows = versionsDataToTableData([
      createVersionData(1, 'test.png'),
      createVersionData(2, 'test-renamed.png')
    ]) as IAssetVersionField[]

    const fileNameRow = rows.find(row => row.Field.key === 'fileName')

    expect(fileNameRow).toBeDefined()
    expect(fileNameRow?.['Version 1']).toBe('test.png')
    expect(fileNameRow?.['Version 2']).toBe('test-renamed.png')
  })

  it('produces rows the category list helper can process (regression pimcore/platform-version#466)', () => {
    const rows = versionsDataToTableData([createVersionData(1, 'test.png')]) as IAssetVersionField[]

    expect(() => getAssetCategoriesList(rows)).not.toThrow()

    const categoryKeys = getAssetCategoriesList(rows).map(category => category.key)

    expect(categoryKeys).toContain(VersionCategoryName.SYSTEM_DATA)
    expect(categoryKeys).toContain(VersionCategoryName.META)
  })
})

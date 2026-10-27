/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('../dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('../components/classification-store/classification-store', () => ({
  ClassificationStore: () => null
}))

// the version details module reaches into the api slices, which are not set up here
jest.mock('@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions', () => ({
  getBreadcrumbTitle: (value1: string, value2: string) => [value1, value2].filter(Boolean).join('/')
}))

const { DynamicTypeObjectDataClassificationStore } = jest.requireActual('./dynamic-type-object-data-classification-store')

interface DynamicTypeObjectDataClassificationStoreLike {
  extractLocalizedFields: (props: any) => Promise<any[]>
  processVersionFieldData: (props: any) => Promise<any[]>
}

const TITLED_KEY_LABEL = 'Height'
const UNTITLED_KEY_NAME = 'ef000002'
const LOCALE = 'en'

const activeGroupDefinitions = [{
  id: 7,
  name: 'dimensions',
  title: 'Dimensions',
  keys: [
    { id: 11, name: 'ef000001', title: TITLED_KEY_LABEL, definition: { datatype: 'data', title: 'Legacy' } },
    { id: 12, name: UNTITLED_KEY_NAME, title: null, definition: { datatype: 'data' } }
  ]
}]

const item = { name: 'store', title: 'Features', activeGroupDefinitions }

describe('DynamicTypeObjectDataClassificationStore', () => {
  let type: DynamicTypeObjectDataClassificationStoreLike

  beforeEach(() => {
    type = new DynamicTypeObjectDataClassificationStore()
  })

  it('labels the keys of the language comparison by their title', async () => {
    const descriptors = await type.extractLocalizedFields({ item, fieldBreadcrumbTitle: '', formPath: [] })

    expect(descriptors.map((descriptor) => descriptor.fieldData.title)).toEqual([TITLED_KEY_LABEL, UNTITLED_KEY_NAME])
  })

  it('labels the keys of a version without values by their title', async () => {
    const fields = await type.processVersionFieldData({
      item,
      fieldBreadcrumbTitle: '',
      fieldValueByName: {},
      fieldPath: '',
      versionId: 1,
      versionCount: 2
    })

    expect(fields.map((field) => field.fieldData.title)).toEqual([TITLED_KEY_LABEL, UNTITLED_KEY_NAME])
  })

  it('labels the keys of a localized version by their title', async () => {
    const fields = await type.processVersionFieldData({
      item,
      fieldBreadcrumbTitle: '',
      fieldValueByName: { 7: { [LOCALE]: { 11: '196', 12: 'value' } } },
      fieldPath: '',
      versionId: 1,
      versionCount: 2
    })

    expect(fields.map((field) => field.fieldData.title)).toEqual([TITLED_KEY_LABEL, UNTITLED_KEY_NAME])
    expect(fields.map((field) => field.fieldData.locale)).toEqual([LOCALE, LOCALE])
  })
})

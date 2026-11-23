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

const classificationStoreModule = jest.requireActual('./dynamic-type-object-data-classification-store')
const { DynamicTypeObjectDataClassificationStore } = classificationStoreModule
const DYNAMIC_LOCALE: string = classificationStoreModule.CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE

interface DynamicTypeObjectDataClassificationStoreLike {
  extractLocalizedFields: (props: any) => Promise<any[]>
  processVersionFieldData: (props: any) => Promise<any[]>
  prepareLanguageComparisonValue: (props: any) => Record<string, any>
  mergeChangedValues: (current: any, incoming: any, context?: any) => any
}

const TITLED_KEY_LABEL = 'Height'
const UNTITLED_KEY_NAME = 'ef000002'
const LOCALE = 'en'
const GROUP_ID = '7'
const KEY_ID = '11'
const VARIANT = 'metric'
const STORE_FIELD = 'store'
const WRAPPER_FIELD = 'blockItems'

const activeGroupDefinitions = [{
  id: 7,
  name: 'dimensions',
  title: 'Dimensions',
  keys: [
    { id: 11, name: 'ef000001', title: TITLED_KEY_LABEL, definition: { datatype: 'data', title: 'Legacy' } },
    { id: 12, name: UNTITLED_KEY_NAME, title: null, definition: { datatype: 'data' } }
  ]
}]

const item = { name: 'store', title: 'Features', localized: true, activeGroupDefinitions }

// A mixed store: the key's own flag decides which keys hold a value per language, and a null or
// absent one inherits the field's.
const mixedActiveGroupDefinitions = [{
  id: 7,
  name: 'dimensions',
  title: 'Dimensions',
  keys: [
    { id: 11, name: 'ef000001', title: 'Inherits', definition: { datatype: 'data' } },
    { id: 12, name: 'ef000002', title: 'Localized', localized: true, definition: { datatype: 'data' } },
    { id: 13, name: 'ef000003', title: 'Independent', localized: false, definition: { datatype: 'data' } }
  ]
}]

describe('DynamicTypeObjectDataClassificationStore', () => {
  let type: DynamicTypeObjectDataClassificationStoreLike

  beforeEach(() => {
    type = new DynamicTypeObjectDataClassificationStore()
  })

  it('labels the keys of the language comparison by their title', async () => {
    const descriptors = await type.extractLocalizedFields({ item, fieldBreadcrumbTitle: '', formPath: [] })

    expect(descriptors.map((descriptor) => descriptor.fieldData.title)).toEqual([TITLED_KEY_LABEL, UNTITLED_KEY_NAME])
  })

  it.each([
    ['a localized field', true, ['Inherits', 'Localized']],
    ['a field that is not localized', false, ['Localized']]
  ])('lists the keys of %s that hold a value per language', async (_name, localized, expected) => {
    const descriptors = await type.extractLocalizedFields({
      item: { ...item, localized, activeGroupDefinitions: mixedActiveGroupDefinitions },
      fieldBreadcrumbTitle: '',
      formPath: []
    })

    expect(descriptors.map((descriptor) => descriptor.fieldData.title)).toEqual(expected)
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

  describe('merging a comparison change into the modified attributes', () => {
    const mergeComparisonChange = (current: any, incoming: any): any =>
      type.mergeChangedValues(current, incoming, { isInherited: () => false })

    it('replaces the entries of a multiValue key instead of merging them by position', () => {
      const merged = mergeComparisonChange(
        { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: [{ var: VARIANT, v: '1' }, { v: '2' }] } } },
        { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: [{ var: VARIANT, v: '1' }] } } }
      )

      expect(merged[GROUP_ID][LOCALE][KEY_ID]).toEqual([{ var: VARIANT, v: '1' }])
    })

    it('does not carry the variant of a removed entry into the one that takes its place', () => {
      const merged = mergeComparisonChange(
        { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: [{ var: VARIANT, v: '1' }] } } },
        { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: [{ v: '2' }] } } }
      )

      expect(merged[GROUP_ID][LOCALE][KEY_ID]).toEqual([{ v: '2' }])
    })

    // A group the comparison holds no own value for is encoded as an empty list, which must not
    // drop what an earlier edit of the same field already wrote.
    it('keeps the keys an earlier edit wrote where the comparison holds no own value', () => {
      const merged = mergeComparisonChange(
        { [GROUP_ID]: { [LOCALE]: { [KEY_ID]: 'own value' } } },
        { [GROUP_ID]: [] }
      )

      expect(merged[GROUP_ID]).toEqual({ [LOCALE]: { [KEY_ID]: 'own value' } })
    })
  })

  describe('preparing the comparison value', () => {
    const descriptorAt = (formPath: Array<string | number>): any => ({ fieldData: { name: KEY_ID }, formPath })

    const prepare = (value: Record<string, any>, formPath: Array<string | number>): Record<string, any> =>
      type.prepareLanguageComparisonValue({ value, descriptors: [descriptorAt(formPath)], locales: [LOCALE] })

    it('turns the language bucket of a store into an object', () => {
      const prepared = prepare(
        { [STORE_FIELD]: { [GROUP_ID]: [] } },
        [STORE_FIELD, GROUP_ID, DYNAMIC_LOCALE, KEY_ID]
      )

      expect(prepared[STORE_FIELD][GROUP_ID][LOCALE]).toEqual({})
    })

    it('leaves the item list of the wrapper field a store sits in alone', () => {
      const prepared = prepare(
        { [WRAPPER_FIELD]: [{ [STORE_FIELD]: [] }, { [STORE_FIELD]: [] }] },
        [WRAPPER_FIELD, 1, STORE_FIELD, GROUP_ID, DYNAMIC_LOCALE, KEY_ID]
      )

      expect(Array.isArray(prepared[WRAPPER_FIELD])).toBe(true)
      expect(prepared[WRAPPER_FIELD]).toHaveLength(2)
      expect(prepared[WRAPPER_FIELD][1][STORE_FIELD][GROUP_ID][LOCALE]).toEqual({})
      expect(prepared[WRAPPER_FIELD][0][STORE_FIELD]).toEqual([])
    })
  })
})

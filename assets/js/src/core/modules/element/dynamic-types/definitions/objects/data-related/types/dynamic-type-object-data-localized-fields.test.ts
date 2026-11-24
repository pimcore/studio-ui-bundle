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

jest.mock('../../../../defintinitions/objects/data-related/components/localized-fields/object-localized-fields', () => ({
  ObjectLocalizedFields: () => null
}))

jest.mock('@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/versions/version-object-localized-fields', () => ({
  VersionObjectLocalizedFields: () => null
}))

const { DynamicTypeObjectDataLocalizedFields } = jest.requireActual('./dynamic-type-object-data-localized-fields')

interface DynamicTypeObjectDataLocalizedFieldsLike {
  mergeChangedValues: (current: any, incoming: any) => any
  processVersionFieldData: (props: any) => Promise<any[]>
}

describe('DynamicTypeObjectDataLocalizedFields.mergeChangedValues', () => {
  let type: DynamicTypeObjectDataLocalizedFieldsLike
  let merge: (current: any, incoming: any) => any

  beforeEach(() => {
    type = new DynamicTypeObjectDataLocalizedFields()
    merge = type.mergeChangedValues
  })

  it('accumulates changes to different fields', () => {
    expect(merge({ name: { de: 'Hallo' } }, { title: { de: 'Titel' } })).toEqual({
      name: { de: 'Hallo' },
      title: { de: 'Titel' }
    })
  })

  it('accumulates changes to different locales of the same field', () => {
    expect(merge({ name: { de: 'Hallo' } }, { name: { en: 'Hello' } })).toEqual({
      name: { de: 'Hallo', en: 'Hello' }
    })
  })

  it('replaces the value for the same field and locale', () => {
    expect(merge({ name: { de: 'Hallo' } }, { name: { de: 'Welt' } })).toEqual({
      name: { de: 'Welt' }
    })
  })

  it('handles undefined current gracefully', () => {
    expect(merge(undefined, { name: { en: 'Hello' } })).toEqual({
      name: { en: 'Hello' }
    })
  })

  it('handles empty current object gracefully', () => {
    expect(merge({}, { name: { en: 'Hello' } })).toEqual({
      name: { en: 'Hello' }
    })
  })

  it('replaces a numeric field value wholesale', () => {
    expect(merge({ count: { de: 1 } }, { count: { de: 42 } })).toEqual({
      count: { de: 42 }
    })
  })

  it('replaces an array field value wholesale, not by index', () => {
    expect(merge(
      { tags: { de: ['a', 'b', 'c'] } },
      { tags: { de: ['x'] } }
    )).toEqual({
      tags: { de: ['x'] }
    })
  })

  it('replaces a null field value wholesale', () => {
    expect(merge({ image: { de: { id: 42 } } }, { image: { de: null } })).toEqual({
      image: { de: null }
    })
  })

  it('replaces a boolean field value wholesale', () => {
    expect(merge({ active: { en: true } }, { active: { en: false } })).toEqual({
      active: { en: false }
    })
  })

  it('preserves all existing locales when adding a new one', () => {
    expect(merge(
      { name: { de: 'Hallo', en: 'Hello', fr: 'Bonjour' } },
      { name: { es: 'Hola' } }
    )).toEqual({
      name: { de: 'Hallo', en: 'Hello', fr: 'Bonjour', es: 'Hola' }
    })
  })

  it('logs an error and returns current when incoming is not a plain object', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const current = { name: { de: 'Hallo' } }

    expect(merge(current, 'invalid')).toEqual(current)
    expect(consoleSpy).toHaveBeenCalledWith(
      'localizedfields mergeChangedValues received invalid payload:',
      'invalid'
    )

    consoleSpy.mockRestore()
  })
})

describe('DynamicTypeObjectDataLocalizedFields.processVersionFieldData', () => {
  const nameField = { datatype: 'data', fieldtype: 'input', name: 'name', title: 'Name' }
  const priceField = { datatype: 'data', fieldtype: 'quantityValue', name: 'price', title: 'Price' }

  const process = async (children: any[], fieldValueByName: any): Promise<any[]> => {
    const type: DynamicTypeObjectDataLocalizedFieldsLike = new DynamicTypeObjectDataLocalizedFields()

    return await type.processVersionFieldData({
      item: { datatype: 'data', fieldtype: 'localizedfields', name: 'localizedfields', children },
      fieldValueByName,
      fieldPath: 'localizedfields',
      fieldBreadcrumbTitle: 'Main',
      versionId: 7,
      versionCount: 2
    })
  }

  it('returns one entry per locale of a direct child field', async () => {
    expect(await process([nameField], { name: { en: 'Hello', de: 'Hallo' } })).toEqual([
      { fieldBreadcrumbTitle: 'Main', versionId: 7, versionCount: 2, fieldData: { ...nameField, locale: 'en' }, fieldValue: 'Hello', fieldPath: 'localizedfields.name.en' },
      { fieldBreadcrumbTitle: 'Main', versionId: 7, versionCount: 2, fieldData: { ...nameField, locale: 'de' }, fieldValue: 'Hallo', fieldPath: 'localizedfields.name.de' }
    ])
  })

  it('returns a single entry for a field without values', async () => {
    expect(await process([nameField], {})).toEqual([
      { fieldBreadcrumbTitle: 'Main', versionId: 7, versionCount: 2, fieldData: nameField, fieldValue: undefined, fieldPath: 'localizedfields.name' }
    ])
  })

  it('returns fields nested in layouts, with the layout titles in the breadcrumb', async () => {
    const children = [
      nameField,
      {
        datatype: 'layout',
        fieldtype: 'tabpanel',
        name: 'tabs',
        title: '',
        children: [{
          datatype: 'layout',
          fieldtype: 'panel',
          name: 'pricing',
          title: 'Pricing',
          children: [priceField]
        }]
      }
    ]
    const price = { value: 10, unitId: 'EUR' }

    const result = await process(children, { name: { en: 'Hello' }, price: { en: price } })

    expect(result).toEqual([
      { fieldBreadcrumbTitle: 'Main', versionId: 7, versionCount: 2, fieldData: { ...nameField, locale: 'en' }, fieldValue: 'Hello', fieldPath: 'localizedfields.name.en' },
      { fieldBreadcrumbTitle: 'Main/Pricing', versionId: 7, versionCount: 2, fieldData: { ...priceField, locale: 'en' }, fieldValue: price, fieldPath: 'localizedfields.price.en' }
    ])
  })
})

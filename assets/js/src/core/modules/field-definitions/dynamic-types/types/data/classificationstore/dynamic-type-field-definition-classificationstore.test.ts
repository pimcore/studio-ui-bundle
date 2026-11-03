/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The real base pulls in @sdk/components (antd-style, untranspiled ESM) and the
// DI container; the stand-in keeps the default data and the name check.
jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract', () => ({
  DynamicTypeFieldDefinitionDataAbstract: class DynamicTypeFieldDefinitionDataAbstract {
    id: string = ''

    getDefaultData (): Record<string, unknown> {
      return { fieldtype: this.id, datatype: 'data', name: '', title: '', tooltip: '' }
    }

    isValid (data: { name: string }): boolean {
      return data.name.trim().length > 0
    }
  }
}))

jest.mock('@Pimcore/modules/field-definitions/dynamic-types/types/data/classificationstore/field-definition-classificationstore-form-fields', () => ({
  FieldDefinitionClassificationstoreFormFields: () => null
}))

const {
  DynamicTypeFieldDefinitionClassificationstore
} = jest.requireActual('./dynamic-type-field-definition-classificationstore')

describe('DynamicTypeFieldDefinitionClassificationstore', () => {
  const type = new DynamicTypeFieldDefinitionClassificationstore()
  const classContext = { area: ['class'], path: [], fieldDefinitions: {} }
  const customLayoutContext = { area: ['class', 'custom-layout'], path: [], fieldDefinitions: {} }
  const field = (overrides: Record<string, unknown>): Record<string, unknown> => ({
    ...type.getDefaultData(),
    name: 'attributes',
    ...overrides
  })

  it('starts a new field with the default store', () => {
    expect(type.getDefaultData().storeId).toBe(1)
  })

  it('accepts a named field with a store', () => {
    expect(type.isValid(field({ storeId: 2 }), classContext)).toBe(true)
  })

  it('rejects a field saved without a store', () => {
    expect(type.isValid(field({ storeId: undefined }), classContext)).toBe(false)
    expect(type.isValid(field({ storeId: null }), classContext)).toBe(false)
  })

  it('still rejects a field without a name', () => {
    expect(type.isValid(field({ name: '' }), classContext)).toBe(false)
  })

  it('does not require a store in a custom layout, which has no Store select', () => {
    expect(type.isValid(field({ storeId: undefined }), customLayoutContext)).toBe(true)
  })
})

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

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/utils/column-helper', () => ({ getDefaultGridColumnWidthFromDynamicObjectType: jest.fn() }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component', () => ({ DataComponent: () => null }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({ EditFormProvider: () => null }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider', () => ({ SaveProvider: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider', () => ({ SuppressEmptyFieldLabelProvider: () => null }))

const { DynamicTypeObjectDataEncryptedField } = jest.requireActual('./dynamic-type-object-data-encrypted-field')

describe('DynamicTypeObjectDataEncryptedField.getObjectDataComponent', () => {
  const type = new DynamicTypeObjectDataEncryptedField()
  const definition = {
    name: 'enc',
    title: 'encrypted_title',
    tooltip: 'encrypted_tooltip',
    delegateDatatype: 'input'
  }

  it('hands the title and tooltip of the encrypted field to the wrapped field', () => {
    const element = type.getObjectDataComponent({ ...definition, delegate: { title: '', tooltip: '', width: 100 } })

    expect(element.props.title).toBe('encrypted_title')
    expect(element.props.tooltip).toBe('encrypted_tooltip')
    expect(element.props.width).toBe(100)
  })

  it('prefers the title of the encrypted field over a title on the wrapped field', () => {
    const element = type.getObjectDataComponent({ ...definition, delegate: { title: 'delegate_title' } })

    expect(element.props.title).toBe('encrypted_title')
  })

  it('leaves the wrapped field without a label in the version view, which renders the title itself', () => {
    const element = type.getVersionObjectDataComponent({ ...definition, delegate: { title: 'delegate_title' } })
    const suppressProvider = element.props.children.props.children
    const dataComponent = suppressProvider.props.children

    expect(suppressProvider.type.name).toBe('SuppressEmptyFieldLabelProvider')
    expect(dataComponent.props.title).toBe('')
    expect(dataComponent.props.tooltip).toBe('')
  })
})

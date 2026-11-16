/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockRegistry = { hasDynamicType: jest.fn(), getDynamicType: jest.fn() }

jest.mock('../dynamic-type-object-data-abstract', () => ({
  DynamicTypeObjectDataAbstract: class DynamicTypeObjectDataAbstract {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: () => mockRegistry } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/utils/column-helper', () => ({ getDefaultGridColumnWidthFromDynamicObjectType: jest.fn(() => 150) }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-editor', () => ({ MultiValueEditor: () => null }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({ EditFormProvider: () => null }))
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider', () => ({ SaveProvider: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/suppress-empty-field-label-provider', () => ({ SuppressEmptyFieldLabelProvider: () => null }))

const { DynamicTypeObjectDataMultiValue } = jest.requireActual('./dynamic-type-object-data-multi-value')
const { getDefaultGridColumnWidthFromDynamicObjectType } = jest.requireMock('@Pimcore/modules/element/dynamic-types/utils/column-helper')

describe('DynamicTypeObjectDataMultiValue grid cell', () => {
  const type = new DynamicTypeObjectDataMultiValue()
  const cellProps = {}

  beforeEach(() => {
    mockRegistry.hasDynamicType.mockReset()
    mockRegistry.getDynamicType.mockReset()
  })

  it('answers with the grid cell definition of the delegate type', () => {
    const delegateDefinition = { mode: 'default', type: 'number' }
    const getGridCellDefinition = jest.fn(() => delegateDefinition)
    const props = { cellProps, objectProps: { name: 'size', delegateDatatype: 'numeric', variants: [], delegate: { integer: true } } }

    mockRegistry.hasDynamicType.mockReturnValue(true)
    mockRegistry.getDynamicType.mockReturnValue({ getGridCellDefinition })

    expect(type.getGridCellDefinition(props)).toBe(delegateDefinition)
    expect(mockRegistry.getDynamicType).toHaveBeenCalledWith('numeric')
    // The delegate is built from its own settings, not from the wrapper's definition.
    expect(getGridCellDefinition).toHaveBeenCalledWith({ cellProps, objectProps: { name: 'size', fieldtype: 'numeric', integer: true } })
  })

  it('previews a repeating key read-only instead of offering the delegate single-value cell', () => {
    mockRegistry.hasDynamicType.mockReturnValue(true)

    expect(type.getGridCellDefinition({ cellProps, objectProps: { name: 'size', delegateDatatype: 'numeric', multiValue: true, variants: [] } })).toEqual({ mode: 'default', type: 'string' })
    expect(mockRegistry.getDynamicType).not.toHaveBeenCalled()
  })

  it('renders a delegate the registry does not know as a string', () => {
    mockRegistry.hasDynamicType.mockReturnValue(false)

    expect(type.getGridCellDefinition({ cellProps, objectProps: { delegateDatatype: 'gone' } })).toEqual({ mode: 'default', type: 'string' })
    expect(mockRegistry.getDynamicType).not.toHaveBeenCalled()
  })

  it.each(['multiValue', 'encryptedField'])('renders a %s delegate as a string instead of recursing', (wrapper) => {
    mockRegistry.hasDynamicType.mockReturnValue(true)

    expect(type.getGridCellDefinition({ cellProps, objectProps: { delegateDatatype: wrapper } })).toEqual({ mode: 'default', type: 'string' })
    expect(type.getDefaultGridColumnWidth({ delegateDatatype: wrapper })).toBeUndefined()
    expect(mockRegistry.getDynamicType).not.toHaveBeenCalled()
  })

  it('answers the default column width through the delegate', () => {
    const props = { delegateDatatype: 'input' }

    expect(type.getDefaultGridColumnWidth(props)).toBe(150)
    expect(getDefaultGridColumnWidthFromDynamicObjectType).toHaveBeenCalledWith('input', props)
  })
})

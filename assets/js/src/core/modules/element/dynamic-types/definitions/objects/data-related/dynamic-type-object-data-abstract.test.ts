/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label', () => ({ FieldLabel: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider', () => ({ defaultFieldWidthValues: {} }))
jest.mock('./components/grid-cells/image/default-preview', () => ({ DefaultPreview: () => null }))
jest.mock('@sdk/utils', () => ({ isNonEmptyString: jest.fn() }))
jest.mock('@Pimcore/utils/helpers', () => ({ respectLineBreak: jest.fn() }))

const { DynamicTypeObjectDataAbstract } = jest.requireActual('./dynamic-type-object-data-abstract')

class TestType extends DynamicTypeObjectDataAbstract {
  id = 'test'
}

describe('DynamicTypeObjectDataAbstract.canReadValue', () => {
  it.each(['Unit 1', 20, {}, [], null, undefined])('reads %p', (value) => {
    expect(new TestType().canReadValue(value)).toBe(true)
  })
})

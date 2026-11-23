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
jest.mock('./abstract/dynamic-type-object-data-abstract-numeric', () => ({
  // the abstract numeric type and its component tree are not what is under test
  DynamicTypeObjectDataAbstractNumeric: class DynamicTypeObjectDataAbstractNumeric { canReadValue (_value: unknown): boolean { return true } }
}))
jest.mock('../../grid-cell-preview/numeric/numeric', () => ({ Numeric: () => null }))

const { DynamicTypeObjectDataNumeric } = jest.requireActual('./dynamic-type-object-data-numeric')

describe('DynamicTypeObjectDataNumeric.canReadValue', () => {
  const type = new DynamicTypeObjectDataNumeric()

  it.each([20, '20', 0, '0', null, undefined, ''])('reads %p', (value) => {
    expect(type.canReadValue(value)).toBe(true)
  })

  it.each(['Unit 1', {}, [], true, NaN, Infinity])('does not read %p', (value) => {
    expect(type.canReadValue(value)).toBe(false)
  })
})

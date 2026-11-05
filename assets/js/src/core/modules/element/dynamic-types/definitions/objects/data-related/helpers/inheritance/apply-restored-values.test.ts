/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { applyRestoredValues } from './apply-restored-values'

describe('applyRestoredValues', () => {
  it('hands back the loaded value itself while nothing was restored', () => {
    const originalValue = { MyBrick: { name: 'Own' } }

    expect(applyRestoredValues(originalValue, new Map())).toBe(originalValue)
  })

  it('overlays the restored fields without touching the loaded value', () => {
    const originalValue = { MyBrick: { name: 'Own', color: 'red' } }

    const result = applyRestoredValues(originalValue, new Map([['MyBrick.name', 'Parent']]))

    expect(result).toEqual({ MyBrick: { name: 'Parent', color: 'red' } })
    expect(originalValue).toEqual({ MyBrick: { name: 'Own', color: 'red' } })
  })

  it('creates numeric keys as object keys', () => {
    const result = applyRestoredValues({}, new Map([['3.default.12', 'Parent']]))

    expect(result).toEqual({ 3: { default: { 12: 'Parent' } } })
    expect(Array.isArray((result as Record<string, unknown>)['3'])).toBe(false)
  })
})

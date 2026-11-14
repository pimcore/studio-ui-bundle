/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildSlots, seedEmptySlots } from './multi-value-slots'

const METRIC = [{ name: 'metric' }]
const DEFAULT_SLOT = { variant: null, label: null, declared: true }

describe('buildSlots default variant declaration', () => {
  it.each([undefined, null, true])('produces the default slot exactly as before when defaultVariant is %p', (defaultVariant) => {
    expect(buildSlots([], [], { defaultVariant })).toEqual([DEFAULT_SLOT])
    expect(buildSlots(METRIC, [], { defaultVariant }).map((slot) => slot.variant)).toEqual(['metric'])
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariant }).map((slot) => slot.variant)).toEqual(['metric', null])
  })

  it('produces no default slot for an explicit false with nothing stored in it', () => {
    expect(buildSlots(METRIC, [], { defaultVariant: false }).map((slot) => slot.variant)).toEqual(['metric'])
    expect(buildSlots(METRIC, [{ var: 'metric', v: 'm' }], { defaultVariant: false }).map((slot) => slot.variant)).toEqual(['metric'])
    expect(buildSlots([], [], { defaultVariant: false })).toEqual([])
  })

  it('keeps a declined default slot that holds a value, as not declared', () => {
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariant: false })).toEqual([
      { variant: 'metric', label: 'metric', declared: true },
      { variant: null, label: null, declared: false }
    ])
  })

  it('heads the default slot with the declared label, and with nothing for an empty one', () => {
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariantLabel: 'Base' })[1].label).toBe('Base')
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariantLabel: '' })[1].label).toBeNull()
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariantLabel: null })[1].label).toBeNull()
  })

  it('seeds no empty entry for a declined default slot, and one for a permitted one', () => {
    expect(seedEmptySlots(METRIC, [], { defaultVariant: false })).toEqual([{ var: 'metric', v: null }])
    expect(seedEmptySlots(METRIC, [{ v: 'd' }], { defaultVariant: false })).toEqual([{ v: 'd' }, { var: 'metric', v: null }])
    expect(seedEmptySlots(METRIC, [], { defaultVariant: true })).toEqual([{ var: 'metric', v: null }])
    expect(seedEmptySlots([], [], { defaultVariant: true })).toEqual([{ v: null }])
  })
})

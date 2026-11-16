/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildSlots, orderEntries, seedEmptySlots, withPositions } from './multi-value-slots'

const METRIC = [{ name: 'metric' }]
const DEFAULT_SLOT = { variant: null, label: null, declared: true }
const IMPERIAL = 'imperial'
const METRIC_NAME = 'metric'

// A position is the entry's place in its own slot, so it orders that slot and nothing else: two
// slots' entries each carry a 0, and reading them as one sequence moved them past each other.
describe('orderEntries reads a position as a place within its own slot', () => {
  it('orders a slot by its positions without moving the slots past each other', () => {
    const stored = [
      { var: METRIC_NAME, v: 'c', p: 1 },
      { var: IMPERIAL, v: 'b', p: 0 },
      { var: METRIC_NAME, v: 'a', p: 0 }
    ]

    expect(orderEntries(stored)).toEqual([
      { var: METRIC_NAME, v: 'a' },
      { var: IMPERIAL, v: 'b' },
      { var: METRIC_NAME, v: 'c' }
    ])
  })

  it('reads back what the writer wrote as the same list, whatever order the slots are held in', () => {
    const held = [{ var: METRIC_NAME, v: 'c' }, { var: METRIC_NAME, v: 'a' }, { var: IMPERIAL, v: 'b' }]

    expect(orderEntries(withPositions(held))).toEqual(held)
  })

  it('orders the entries of one slot as before', () => {
    expect(orderEntries([{ v: 'late', p: 2 }, { v: 'early', p: 0 }, { v: 'middle', p: 1 }]))
      .toEqual([{ v: 'early' }, { v: 'middle' }, { v: 'late' }])
  })
})

describe('buildSlots default variant declaration', () => {
  it.each([undefined, null, true])('produces the default slot wherever the key permits it, when defaultVariant is %p', (defaultVariant) => {
    expect(buildSlots([], [], { defaultVariant })).toEqual([DEFAULT_SLOT])
    expect(buildSlots(METRIC, [], { defaultVariant }).map((slot) => slot.variant)).toEqual([METRIC_NAME, null])
    expect(buildSlots(METRIC, [{ v: 'd' }], { defaultVariant }).map((slot) => slot.variant)).toEqual([METRIC_NAME, null])
  })

  it('offers the default slot after the declared variants for a key that permits it', () => {
    expect(buildSlots(METRIC, [], { defaultVariant: true })).toEqual([
      { variant: METRIC_NAME, label: METRIC_NAME, declared: true },
      DEFAULT_SLOT
    ])
  })

  it('heads a permitted default slot beside declared variants with the declared label', () => {
    expect(buildSlots(METRIC, [], { defaultVariantLabel: 'Base' })[1]).toEqual({ variant: null, label: 'Base', declared: true })
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
    expect(seedEmptySlots(METRIC, [], { defaultVariant: true })).toEqual([{ var: METRIC_NAME, v: null }, { v: null }])
    expect(seedEmptySlots([], [], { defaultVariant: true })).toEqual([{ v: null }])
  })
})

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ADVANCED_COLUMN_KEY, type AvailableColumn, buildColumnPickerGroups } from './available-columns-provider'

const column = (key: string, group: unknown, title?: string): AvailableColumn => ({
  key,
  group,
  config: title === undefined ? {} : { fieldDefinition: { title } }
}) as unknown as AvailableColumn

const t = (key: string): string => `t(${key})`

describe('buildColumnPickerGroups', () => {
  it('nests a column under its group path and carries the column as meta', () => {
    const sku = column('sku', ['Attributes', 'Base data'])

    const groups = buildColumnPickerGroups([sku], t)

    expect(groups).toHaveLength(1)
    expect(groups[0].label).toBe('t(Attributes)')
    expect(groups[0].items).toEqual([])
    expect(groups[0].children).toHaveLength(1)
    expect(groups[0].children![0].label).toBe('t(Base data)')
    expect(groups[0].children![0].items).toEqual([{ key: 'sku', label: 't(sku)', meta: sku }])
  })

  it('collects the columns of one group in one node, in their order', () => {
    const groups = buildColumnPickerGroups([column('sku', ['Base data']), column('name', ['Base data'])], t)

    expect(groups).toHaveLength(1)
    expect(groups[0].items.map((item) => item.key)).toEqual(['sku', 'name'])
  })

  it('labels a column by its field definition title', () => {
    const groups = buildColumnPickerGroups([column('sku', ['Base data'], 'Article number')], t)

    expect(groups[0].items[0].label).toBe('t(Article number)')
  })

  it('offers a column under each of its group paths', () => {
    const sku = column('sku', [['Attributes', 'Base data'], ['System']])

    const groups = buildColumnPickerGroups([sku], t)

    expect(groups.map((group) => group.label)).toEqual(['t(Attributes)', 't(System)'])
    expect(groups[0].children![0].items[0].meta).toBe(sku)
    expect(groups[1].items[0].meta).toBe(sku)
  })

  it('gives every group a key of its own', () => {
    const groups = buildColumnPickerGroups([column('sku', ['A', 'B']), column('name', ['C'])], t)

    const keys = [groups[0].key, groups[0].children![0].key, groups[1].key]

    expect(new Set(keys).size).toBe(3)
  })

  it('leaves out the advanced column and a group that only holds it', () => {
    const groups = buildColumnPickerGroups([
      column(ADVANCED_COLUMN_KEY, ['Advanced']),
      column(ADVANCED_COLUMN_KEY, ['Base data']),
      column('sku', ['Base data'])
    ], t)

    expect(groups.map((group) => group.label)).toEqual(['t(Base data)'])
    expect(groups[0].items.map((item) => item.key)).toEqual(['sku'])
  })

  it('leaves out a column without a group', () => {
    expect(buildColumnPickerGroups([column('sku', null)], t)).toEqual([])
  })
})

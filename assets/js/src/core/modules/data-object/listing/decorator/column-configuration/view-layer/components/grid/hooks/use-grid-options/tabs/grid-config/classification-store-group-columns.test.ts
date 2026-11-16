/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { classificationStoreColumnsToAdd } from './classification-store-group-columns'

const FIELD_NAME = 'technicalAttributes'
const GROUP_ID = 7
const NUMERIC = 'numeric'

const baseColumn: AvailableColumn = {
  key: FIELD_NAME,
  type: 'dataobject.classificationstore',
  group: {},
  sortable: false,
  editable: true,
  localizable: true,
  config: { fieldDefinition: { name: FIELD_NAME } }
}

const widthDefinition = { fieldtype: NUMERIC, name: 'width' }
const heightDefinition = { fieldtype: 'input', name: 'height' }
const depthDefinition = { fieldtype: NUMERIC, name: 'depth' }

// the keys are deliberately not in id order: layout-by-group already returns them in the
// configured order, which the grid has to keep
const groupLayout: ClassificationStoreGroupLayout2 = {
  id: GROUP_ID,
  name: 'Dimensions',
  description: null,
  keys: [
    { id: 9, name: 'width', description: '', definition: widthDefinition },
    { id: 2, name: 'height', description: '', definition: heightDefinition },
    { id: 5, name: 'depth', description: '', definition: depthDefinition }
  ]
}

const columnForKey = (groupId: number, keyId: number, locale: string, width: number): AvailableColumn => ({
  ...baseColumn,
  locale,
  width,
  config: { groupId, keyId, fieldDefinition: heightDefinition }
})

describe('classificationStoreColumnsToAdd', () => {
  it('adds a column per key of a picked group, in the order the layout lists them', () => {
    const result = classificationStoreColumnsToAdd({ type: TabId.Group, data: [groupLayout] }, baseColumn, [])

    expect(result).toHaveLength(3)
    expect(result.map((column) => column.config)).toEqual([
      { groupId: GROUP_ID, keyId: 9, variant: null, fieldDefinition: widthDefinition },
      { groupId: GROUP_ID, keyId: 2, variant: null, fieldDefinition: heightDefinition },
      { groupId: GROUP_ID, keyId: 5, variant: null, fieldDefinition: depthDefinition }
    ])
    expect(result.map((column) => column.frontendType)).toEqual([NUMERIC, 'input', NUMERIC])
    expect(result.map((column) => column.key)).toEqual([FIELD_NAME, FIELD_NAME, FIELD_NAME])
    expect(result.map((column) => column.locale)).toEqual(['default', 'default', 'default'])
  })

  it('leaves out the keys of the group the draft already shows, and the columns showing them alone', () => {
    const shownHeight = columnForKey(GROUP_ID, 2, 'de', 220)
    const shownDepth = columnForKey(GROUP_ID, 5, 'en', 80)
    // the same group and key of another classification store field is a column of its own
    const otherField = { ...columnForKey(GROUP_ID, 9, 'de', 150), key: 'marketingAttributes' }
    const columns = [shownHeight, shownDepth, otherField]

    const result = classificationStoreColumnsToAdd({ type: TabId.Group, data: [groupLayout] }, baseColumn, columns)

    expect(result).toHaveLength(1)
    expect(result[0].config).toEqual({ groupId: GROUP_ID, keyId: 9, variant: null, fieldDefinition: widthDefinition })

    const applied = [...columns, ...result]

    expect(applied).toHaveLength(4)
    expect(applied[0]).toBe(shownHeight)
    expect(applied[1]).toBe(shownDepth)
    expect(applied[2]).toBe(otherField)
  })

  it('adds a column per key picked on Group by Key, leaving out a key the draft already shows', () => {
    const columns = [columnForKey(GROUP_ID, 2, 'de', 220)]

    const result = classificationStoreColumnsToAdd({
      type: TabId.GroupByKey,
      data: [
        { id: 2, name: 'height', description: '', definition: heightDefinition, groupId: GROUP_ID },
        { id: 9, name: 'width', description: '', definition: widthDefinition, groupId: GROUP_ID }
      ]
    }, baseColumn, columns)

    expect(result.map((column) => column.config)).toEqual([
      { groupId: GROUP_ID, keyId: 9, variant: null, fieldDefinition: widthDefinition }
    ])
  })

  it('adds nothing for a group without keys', () => {
    const result = classificationStoreColumnsToAdd({
      type: TabId.Group,
      data: [{ ...groupLayout, keys: [] }]
    }, baseColumn, [])

    expect(result).toEqual([])
  })

  it('adds nothing for a group whose every key the draft already shows', () => {
    const columns = [
      columnForKey(GROUP_ID, 9, 'de', 220),
      columnForKey(GROUP_ID, 2, 'de', 220),
      columnForKey(GROUP_ID, 5, 'de', 220)
    ]

    const result = classificationStoreColumnsToAdd({ type: TabId.Group, data: [groupLayout] }, baseColumn, columns)

    expect(result).toEqual([])
  })

  describe('a multiValue key', () => {
    const multiValueDefinition = { fieldtype: 'multiValue', name: 'color', delegateDatatype: 'input' }
    const keyWith = (variants: any): any => ({ id: 12, name: 'color', description: '', definition: multiValueDefinition, variants })
    const pick = (key: any): AvailableColumn[] => classificationStoreColumnsToAdd({ type: TabId.GroupByKey, data: [{ ...key, groupId: GROUP_ID }] }, baseColumn, [])
    const variantsOf = (columns: AvailableColumn[]): unknown[] => columns.map((column) => (column.config as any).variant)

    it('adds one column per declared variant in declaration order, then one for the default slot', () => {
      const result = pick(keyWith([{ name: 'Metric', label: 'Metric' }, { name: 'Imperial' }]))

      expect(variantsOf(result)).toEqual(['Metric', 'Imperial', null])
      expect(result[2].config).toHaveProperty('variant', null)
      expect(result.every((column) => (column.config as any).keyId === 12)).toBe(true)
    })

    it('adds the default slot alone for a key with no variants', () => {
      expect(variantsOf(pick(keyWith([])))).toEqual([null])
      expect(variantsOf(pick(keyWith(null)))).toEqual([null])
    })

    it('declares no column for a variant row with an empty name', () => {
      expect(variantsOf(pick(keyWith([{ name: '' }, { name: 'Metric' }])))).toEqual(['Metric', null])
    })

    it('adds no second column for a variant the draft already holds, picking the key or its group again', () => {
      const key = keyWith([{ name: 'Metric' }, { name: 'Imperial' }])
      const held = pick(key).filter((column) => (column.config as any).variant === 'Metric')

      expect(variantsOf(classificationStoreColumnsToAdd({ type: TabId.GroupByKey, data: [{ ...key, groupId: GROUP_ID }] }, baseColumn, held))).toEqual(['Imperial', null])
      expect(variantsOf(classificationStoreColumnsToAdd({ type: TabId.Group, data: [{ ...groupLayout, keys: [key] }] }, baseColumn, held))).toEqual(['Imperial', null])
    })

    it('shows a repeating key display-only and leaves a non-repeating key editable, in every slot', () => {
      const repeating = { ...keyWith([{ name: 'Metric' }]), definition: { ...multiValueDefinition, multiValue: true } }

      expect(pick(repeating).map((column) => column.editable)).toEqual([false, false])
      expect(pick(keyWith([{ name: 'Metric' }])).map((column) => column.editable)).toEqual([true, true])
    })

    it('reads a repeating key from the layout member when its definition omits the flag', () => {
      const result = pick({ ...keyWith([{ name: 'Metric' }]), multiValue: true })

      expect(result.map((column) => column.editable)).toEqual([false, false])
      expect(result.map((column) => (column.config as any).fieldDefinition.multiValue)).toEqual([true, true])
    })
  })
})

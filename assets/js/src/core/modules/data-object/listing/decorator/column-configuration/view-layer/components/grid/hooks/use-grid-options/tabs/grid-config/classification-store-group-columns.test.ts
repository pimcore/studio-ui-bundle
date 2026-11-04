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
      { groupId: GROUP_ID, keyId: 9, fieldDefinition: widthDefinition },
      { groupId: GROUP_ID, keyId: 2, fieldDefinition: heightDefinition },
      { groupId: GROUP_ID, keyId: 5, fieldDefinition: depthDefinition }
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
    expect(result[0].config).toEqual({ groupId: GROUP_ID, keyId: 9, fieldDefinition: widthDefinition })

    const applied = [...columns, ...result]

    expect(applied).toHaveLength(4)
    expect(applied[0]).toBe(shownHeight)
    expect(applied[1]).toBe(shownDepth)
    expect(applied[2]).toBe(otherField)
  })

  it('adds a column per key picked on Group by Key, without leaving any of them out', () => {
    const columns = [columnForKey(GROUP_ID, 2, 'de', 220)]

    const result = classificationStoreColumnsToAdd({
      type: TabId.GroupByKey,
      data: [
        { id: 2, name: 'height', description: '', definition: heightDefinition, groupId: GROUP_ID },
        { id: 9, name: 'width', description: '', definition: widthDefinition, groupId: GROUP_ID }
      ]
    }, baseColumn, columns)

    expect(result.map((column) => column.config)).toEqual([
      { groupId: GROUP_ID, keyId: 2, fieldDefinition: heightDefinition },
      { groupId: GROUP_ID, keyId: 9, fieldDefinition: widthDefinition }
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
})

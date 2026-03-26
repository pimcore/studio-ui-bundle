/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { ElementSelectorButton } from '@Pimcore/modules/element/element-selector/components/triggers/button/element-selector-button'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import {
  convertAllowedTypes,
  createElementSelectorAreas,
  createElementSelectorConfig,
  dndIsValidData,
  type IRelationAllowedTypesClassDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { Droppable, type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { type SelectedItem } from '@sdk/modules/element'
import { type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'

export type RelationFilterEntry = { type: 'asset' | 'object' | 'document', ids: number[] }
export type RelationFilterValue = RelationFilterEntry[] | null

const buildFilterValue = (items: ManyToManyRelationValueItem[]): RelationFilterValue => {
  if (items.length === 0) return null

  const grouped: Record<string, number[]> = {}
  for (const item of items) {
    const t = item.type as 'asset' | 'object' | 'document'
    if (grouped[t] === undefined) grouped[t] = []
    grouped[t].push(item.id)
  }

  const entries = Object.entries(grouped)
    .filter(([, ids]) => ids.length > 0)
    .map(([type, ids]) => ({ type: type as 'asset' | 'object' | 'document', ids }))

  return entries.length > 0 ? entries : null
}

const getSubType = (item: SelectedItem): string | null => {
  if (item.elementType === 'data-object') {
    return item.data.classname ?? 'folder'
  }
  return item.data.type ?? null
}

export const DynamicTypeFieldFilterRelationComponent = (): React.JSX.Element => {
  const { setData, config } = useDynamicFilter()

  const fieldDefinition = config?.fieldDefinition as IRelationAllowedTypesClassDefinition | undefined
  const allowedTypes = fieldDefinition !== undefined ? convertAllowedTypes(fieldDefinition) : {
    assetsAllowed: true,
    dataObjectsAllowed: true,
    documentsAllowed: true
  }

  const [items, setItems] = useState<ManyToManyRelationValueItem[]>([])

  const updateItems = (next: ManyToManyRelationValueItem[]): void => {
    setItems(next)
    setData(buildFilterValue(next))
  }

  const addItems = (newItems: ManyToManyRelationValueItem[]): void => {
    const merged = [...items]
    for (const item of newItems) {
      const isDuplicate = merged.some((existing) => existing.id === item.id && existing.type === item.type)
      if (!isDuplicate) {
        merged.push(item)
      }
    }
    updateItems(merged)
  }

  const removeItem = (id: number, type: string): void => {
    updateItems(items.filter((item) => !(item.id === id && item.type === type)))
  }

  const clearAll = (): void => {
    setItems([])
    setData(null)
  }

  const handleDrop = (info: DragAndDropInfo): void => {
    const legacyType = mapToLegacyElementType(info.type as 'asset' | 'document' | 'data-object')
    const newItem: ManyToManyRelationValueItem = {
      id: info.data.id,
      type: legacyType,
      subtype: info.type === 'data-object'
        ? (info.data.className ?? info.data.type)
        : info.data.type,
      fullPath: info.data.fullPath,
      isPublished: info.data.published ?? null
    }
    addItems([newItem])
  }

  const selectorAreas = createElementSelectorAreas(allowedTypes)
  const selectorConfig = createElementSelectorConfig(allowedTypes)

  return (
    <Droppable
      isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
      isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, allowedTypes) }
      onDrop={ handleDrop }
    >
      <Flex
        align="flex-start"
        gap="extra-small"
        vertical
      >
        <Flex
          gap="extra-small"
          style={ { flexWrap: 'wrap', minHeight: 24 } }
        >
          { items.map((item) => (
            <ElementTag
              elementType={ item.type === 'object' ? 'data-object' : item.type as 'asset' | 'document' }
              id={ item.id }
              key={ `${item.type}-${item.id}` }
              onClose={ () => { removeItem(item.id, item.type) } }
              path={ item.fullPath }
              published={ item.isPublished ?? undefined }
            />
          )) }
        </Flex>

        <Flex gap="extra-small">
          <ElementSelectorButton
            elementSelectorConfig={ {
              selectionType: SelectionType.Multiple,
              areas: selectorAreas,
              config: selectorConfig,
              onFinish: (event) => {
                const newItems: ManyToManyRelationValueItem[] = event.items.map((item) => ({
                  id: item.data.id,
                  type: mapToLegacyElementType(item.elementType),
                  subtype: getSubType(item),
                  fullPath: item.data.fullpath,
                  isPublished: item.data.published ?? null
                }))
                addItems(newItems)
              }
            } }
            type="default"
          />

          { items.length > 0 && (
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ clearAll }
              type="default"
            />
          ) }
        </Flex>
      </Flex>
    </Droppable>
  )
}

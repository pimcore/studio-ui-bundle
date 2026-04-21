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
import { theme } from 'antd'
import { isUndefined } from 'lodash'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
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
import { mapToLegacyElementType, isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { Droppable, type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type SelectedItem } from '@sdk/modules/element'
import { type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'

const getDisplayName = (fullPath: string): string => {
  const parts = fullPath.split('/')
  return parts[parts.length - 1] !== '' ? parts[parts.length - 1] : fullPath
}

const getElementTypeIcon = (type: string): string => {
  if (type === 'object') return 'data-object'
  if (type === 'asset') return 'asset'
  return 'document'
}

export interface RelationFilterEntry { type: 'asset' | 'object' | 'document', ids: number[] }
export type RelationFilterValue = RelationFilterEntry[] | null

const buildFilterValue = (items: ManyToManyRelationValueItem[]): RelationFilterValue => {
  if (items.length === 0) return null

  const grouped: Record<string, number[]> = {}
  for (const item of items) {
    const t = item.type as 'asset' | 'object' | 'document'
    if (isUndefined(grouped[t])) grouped[t] = []
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

interface RelationFilterDropAreaProps {
  items: ManyToManyRelationValueItem[]
  onRemove: (id: number, type: string) => void
  onSelect: () => void
  selectorAreas: ReturnType<typeof createElementSelectorAreas>
  selectorConfig: ReturnType<typeof createElementSelectorConfig>
  onFinish: (event: { items: SelectedItem[] }) => void
}

const RelationFilterInner = ({
  items,
  onRemove,
  selectorAreas,
  selectorConfig,
  onFinish
}: RelationFilterDropAreaProps): React.JSX.Element => {
  const { isDragActive, isOver } = useDroppable()
  const { token } = theme.useToken()

  const dropAreaStyle: React.CSSProperties = {
    width: '100%',
    padding: '6px 8px',
    border: `1px dashed ${isOver ? token.colorPrimary : token.colorBorder}`,
    borderRadius: token.borderRadius,
    background: isOver ? token.colorPrimaryBg : token.colorFillAlter,
    color: isOver ? token.colorPrimary : token.colorTextSecondary,
    fontSize: token.fontSizeSM,
    textAlign: 'center',
    boxSizing: 'border-box',
    transition: 'all 0.2s'
  }

  return (
    <Flex
      align="flex-start"
      justify="space-between"
      style={ { width: '100%' } }
    >
      <Flex
        gap="extra-small"
        style={ { flex: 1, flexWrap: 'wrap', minHeight: 24 } }
        vertical
      >
        { isDragActive && (
          <div style={ dropAreaStyle }>
            Drop here
          </div>
        ) }

        <Flex
          gap="extra-small"
          style={ { flexWrap: 'wrap' } }
        >
          { items.map((item) => (
            <ElementTag
              elementType={ item.type === 'object' ? 'data-object' : item.type as 'asset' | 'document' }
              iconName={ getElementTypeIcon(item.type) }
              inline
              key={ `${item.type}-${item.id}` }
              onClose={ () => { onRemove(item.id, item.type) } }
              path={ `${getDisplayName(item.fullPath)} (${item.id})` }
              published={ item.isPublished ?? undefined }
            />
          )) }
        </Flex>
      </Flex>

      <ElementSelectorButton
        elementSelectorConfig={ {
          selectionType: SelectionType.Multiple,
          areas: selectorAreas,
          config: selectorConfig,
          onFinish
        } }
        style={ { flexShrink: 0, marginLeft: 4 } }
        type="default"
      />
    </Flex>
  )
}

export const DynamicTypeFieldFilterRelationComponent = (): React.JSX.Element => {
  const { setData, config } = useDynamicFilter()

  const fieldDefinition = config?.fieldDefinition as IRelationAllowedTypesClassDefinition | undefined
  const convertedTypes = fieldDefinition !== undefined ? convertAllowedTypes(fieldDefinition) : undefined
  const nothingAllowed = convertedTypes !== undefined &&
    convertedTypes.assetsAllowed !== true &&
    convertedTypes.dataObjectsAllowed !== true &&
    convertedTypes.documentsAllowed !== true
  const allowedTypes = convertedTypes === undefined || nothingAllowed
    ? { assetsAllowed: true, dataObjectsAllowed: true, documentsAllowed: true }
    : convertedTypes

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

  const handleFinish = (event: { items: SelectedItem[] }): void => {
    const newItems: ManyToManyRelationValueItem[] = event.items.map((item) => ({
      id: item.data.id,
      type: mapToLegacyElementType(item.elementType),
      subtype: getSubType(item),
      fullPath: item.data.fullpath,
      isPublished: item.data.published ?? null
    }))
    addItems(newItems)
  }

  return (
    <Droppable
      isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
      isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, allowedTypes) }
      onDrop={ handleDrop }
    >
      <RelationFilterInner
        items={ items }
        onFinish={ handleFinish }
        onRemove={ removeItem }
        onSelect={ () => {} }
        selectorAreas={ selectorAreas }
        selectorConfig={ selectorConfig }
      />
    </Droppable>
  )
}

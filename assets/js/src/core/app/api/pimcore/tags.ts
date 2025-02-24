/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export type Tag = string | {
  type: string
  id: number | string
  elementType?: ElementType
}

export const tagNames = {
  ELEMENT: 'ELEMENT',
  ASSET: 'ASSET',
  ASSET_DETAIL: 'ASSET_DETAIL',
  ASSET_TREE: 'ASSET_TREE',
  ASSET_GRID_CONFIGURATION: 'ASSET_GRID_CONFIGURATION',
  ASSET_GRID_CONFIGURATION_LIST: 'ASSET_GRID_CONFIGURATION_LIST',
  ASSET_GRID_CONFIGURATION_DETAIL: 'ASSET_GRID_CONFIGURATION_DETAIL',
  DATA_OBJECT: 'DATA_OBJECT',
  DATA_OBJECT_DETAIL: 'DATA_OBJECT_DETAIL',
  DATA_OBJECT_TREE: 'DATA_OBJECT_TREE',
  WORKFLOW: 'WORKFLOW',
  VERSIONS: 'VERSION',
  PROPERTIES: 'PROPERTIES',
  SCHEDULES: 'SCHEDULES',
  DEPENDENCIES: 'DEPENDENCIES',
  NOTES_AND_EVENTS: 'NOTES_AND_EVENTS',
  AVAILABLE_TAGS: 'AVAILABLE_TAGS',
  ELEMENT_TAGS: 'TAGS',
  ROLE: 'ROLE'
}

export const providingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET, tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET, tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_TREE, id }],
  ASSET_GRID_CONFIGURATION: () => [tagNames.ASSET_GRID_CONFIGURATION],
  ASSET_GRID_CONFIGURATION_LIST: (folderId: number) => [
    tagNames.ASSET,
    { type: tagNames.ASSET_DETAIL, id: folderId },
    tagNames.ASSET_GRID_CONFIGURATION,
    { type: tagNames.ASSET_GRID_CONFIGURATION_LIST, id: folderId }
  ],
  ASSET_GRID_CONFIGURATION_DETAIL: (folderId?: number, configurationId?: number) => [
    tagNames.ASSET,
    { type: tagNames.ASSET_DETAIL, id: folderId },
    tagNames.ASSET_GRID_CONFIGURATION,
    { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `${folderId}-${configurationId}` },
    { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `-${configurationId}` }
  ],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_DETAIL, id }],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.WORKFLOW, elementType, id)],
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.PROPERTIES, elementType, id)],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }, tagNames.SCHEDULES],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.SCHEDULES, elementType, id)],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.VERSIONS, elementType, id)],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)],
  ROLE: () => [tagNames.ROLE]
}

export const invalidatingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, elementUnspecificDataTag],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_GRID_CONFIGURATION: () => [tagNames.ASSET_GRID_CONFIGURATION],
  ASSET_GRID_CONFIGURATION_DETAIL: (folderId?: number, configurationId?: number) => [{ type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `${folderId}-${configurationId}` }, { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `${folderId}-${configurationId}` }],
  ASSET_GRID_CONFIGURATION_LIST: (folderId: number) => [{ type: tagNames.ASSET_GRID_CONFIGURATION_LIST, id: folderId }],
  DATA_OBJECT: () => [tagNames.DATA_OBJECT],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_DETAIL, id }, elementUnspecificDataTag],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.WORKFLOW, elementType, id)],
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.PROPERTIES, elementType, id)],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.SCHEDULES, elementType, id)],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.VERSIONS, elementType, id)],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)],
  ROLE: () => [tagNames.ROLE]
}

const elementUnspecificDataTag = tagNames.AVAILABLE_TAGS

const getElementSpecificTag = (tagType: string, elementType: ElementType, id: number): Tag => ({ type: tagType, id, elementType })

const getElementDetailTag = (elementType: ElementType, id: number): Tag => {
  switch (elementType) {
    case 'asset':
      return { type: tagNames.ASSET_DETAIL, id }
    case 'data-object':
      return { type: tagNames.DATA_OBJECT_DETAIL, id }
    case 'document':
      return { type: tagNames.DATA_OBJECT_DETAIL, id }
  }
}

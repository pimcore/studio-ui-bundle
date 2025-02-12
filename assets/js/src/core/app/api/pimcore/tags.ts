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

import { type ElementType } from 'types/element-type.d'

export type Tag = string | {
  type: string
  id: number | string
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
  ELEMENT_TAGS: 'ELEMENT_TAGS',
  ROLE: 'ROLE'
}

export const providingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET, tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET, tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, tagNames.ASSET_TREE, { type: tagNames.ASSET_TREE, id }],
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
  DATA_OBJECT_TREE_ID: (id: number) => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE, { type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.DEPENDENCIES, id, elementType }, tagNames.DEPENDENCIES],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.WORKFLOW, id, elementType }, tagNames.WORKFLOW],
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }, tagNames.PROPERTIES],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.PROPERTIES, id, elementType }, tagNames.PROPERTIES],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }, tagNames.SCHEDULES],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.SCHEDULES, id, elementType }, tagNames.SCHEDULES],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }, tagNames.VERSIONS],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.VERSIONS, id, elementType }, tagNames.VERSIONS],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [tagNames.NOTES_AND_EVENTS, { type: tagNames.NOTES_AND_EVENTS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.NOTES_AND_EVENTS, id, elementType }, tagNames.NOTES_AND_EVENTS],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), { type: tagNames.ELEMENT_TAGS, id }, tagNames.ELEMENT_TAGS],
  ROLE: () => [tagNames.ROLE]
}

export const invalidatingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_GRID_CONFIGURATION: () => [tagNames.ASSET_GRID_CONFIGURATION],
  ASSET_GRID_CONFIGURATION_DETAIL: (folderId?: number, configurationId?: number) => [{ type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `${folderId}-${configurationId}` }, { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: `${folderId}-${configurationId}` }],
  ASSET_GRID_CONFIGURATION_LIST: (folderId: number) => [{ type: tagNames.ASSET_GRID_CONFIGURATION_LIST, id: folderId }],
  DATA_OBJECT: () => [tagNames.DATA_OBJECT],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_DETAIL, id }],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [{ type: tagNames.DEPENDENCIES, id, elementType }],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [{ type: tagNames.WORKFLOW, id, elementType }],
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [{ type: tagNames.PROPERTIES, id, elementType }],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [{ type: tagNames.SCHEDULES, id, elementType }],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [{ type: tagNames.VERSIONS, id, elementType }],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id, elementType }],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [{ type: tagNames.ELEMENT_TAGS, id }],
  ROLE: () => [tagNames.ROLE]
}

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

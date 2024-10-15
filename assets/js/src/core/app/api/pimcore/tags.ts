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
  id: number
}

export const tagNames = {
  ELEMENT: 'ELEMENT',
  ASSET: 'ASSET',
  ASSET_DETAIL: 'ASSET_DETAIL',
  ASSET_TREE: 'ASSET_TREE',
  DATA_OBJECT: 'DATA_OBJECT',
  DATA_OBJECT_DETAIL: 'DATA_OBJECT_DETAIL',
  DATA_OBJECT_TREE: 'DATA_OBJECT_TREE',
  WORKFLOW: 'WORKFLOW',
  VERSIONS: 'VERSION',
  PROPERTIES: 'PROPERTIES',
  SCHEDULES: 'SCHEDULES',
  DEPENDENCIES: 'DEPENDENCIES',
  NOTES_AND_EVENTS: 'NOTES_AND_EVENTS'
}

export const providingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET, tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET, tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, tagNames.ASSET_TREE, { type: tagNames.ASSET_TREE, id }],
  ASSET_VERSIONS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.VERSIONS],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_DETAIL, id }],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE, { type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), tagNames.PROPERTIES],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), tagNames.DEPENDENCIES],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [{ type: tagNames.SCHEDULES, id, elementType }, tagNames.SCHEDULES],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), tagNames.WORKFLOW],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }, tagNames.VERSIONS],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), tagNames.NOTES_AND_EVENTS],
  NOTES_AND_EVENTS_ID: (id: number) => [tagNames.NOTES_AND_EVENTS, { type: tagNames.NOTES_AND_EVENTS, id }]
}

export const invalidatingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_VERSIONS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  DATA_OBJECT: () => [tagNames.DATA_OBJECT],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_DETAIL, id }],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_TREE, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id)],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id)],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [{ type: tagNames.SCHEDULES, id, elementType }],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id)],
  NOTES_AND_EVENTS_ID: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id)]
}

const getElementDetailTag = (elementType: ElementType, id: number): Tag => {
  switch (elementType) {
    case 'asset':
      return { type: tagNames.ASSET_DETAIL, id }
    case 'data-object':
      return { type: tagNames.DATA_OBJECT_DETAIL, id }
  }

  throw new Error(`Unknown element type: ${elementType}`)
}

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

export type Tag = string | {
  type: string
  id: number
}

export const tagNames = {
  ELEMENT: 'ELEMENT',
  ASSET: 'ASSET',
  ASSET_DETAIL: 'ASSET_DETAIL',
  ASSET_TREE: 'ASSET_TREE',
  ASSET_LIST: 'ASSET_LIST',
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
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, tagNames.ASSET_TREE, { type: tagNames.ASSET_DETAIL, id }, { type: tagNames.ASSET_TREE, id }],
  ASSET_LIST: (id) => [tagNames.ASSET, tagNames.ASSET_LIST, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_WORKFLOW: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.WORKFLOW],
  ASSET_VERSIONS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.VERSIONS],
  ASSET_PROPERTIES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.PROPERTIES],
  ASSET_SCHEDULES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.SCHEDULES],
  ASSET_DEPENDENCIES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.DEPENDENCIES],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }, tagNames.VERSIONS],
  ASSET_NOTES_AND_EVENTS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, tagNames.NOTES_AND_EVENTS],
  NOTES_AND_EVENTS_ID: (id: number) => [tagNames.NOTES_AND_EVENTS, { type: tagNames.NOTES_AND_EVENTS, id }]
}

export const invalidatingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_LIST: () => [tagNames.ASSET_LIST],
  ASSET_WORKFLOW: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_VERSIONS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_PROPERTIES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_SCHEDULES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_DEPENDENCIES: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  NOTES_AND_EVENTS_ID: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ASSET_NOTES_AND_EVENTS: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }]
}

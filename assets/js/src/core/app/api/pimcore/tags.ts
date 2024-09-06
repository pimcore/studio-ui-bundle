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

import { } from '@reduxjs/toolkit'

export const tagNames = {
  ASSET: 'ASSET',
  ASSET_DETAIL: 'ASSET_DETAIL',
  ASSET_TREE: 'ASSET_TREE',
  ASSET_LIST: 'ASSET_LIST'
}

export const providingTags = {
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET, tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET, tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, tagNames.ASSET_TREE, { type: tagNames.ASSET_TREE, id }],
  ASSET_LIST: () => [tagNames.ASSET, tagNames.ASSET_LIST]
}

export const invalidatingTags = {
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_LIST: () => [tagNames.ASSET_LIST]
}

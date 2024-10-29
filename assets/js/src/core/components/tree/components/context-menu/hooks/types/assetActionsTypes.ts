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

import type { TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'

export interface NodeAware {
  node?: TreeNodeProps
}

export interface NodeIdAware {
  nodeId: string | undefined
}

export interface OnClickAware {
  onClick: () => void
}

export interface AssetContextMenuBase {
  hidden?: boolean
}

export interface AssetContextMenuRename extends AssetContextMenuBase, OnClickAware {}

export interface AssetContextMenuDelete extends AssetContextMenuBase, OnClickAware {}

export interface AssetContextMenuCopy extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuPaste {
  onClick: (node: TreeNodeProps) => void
}

export interface AssetContextMenuCut extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuRefresh extends AssetContextMenuBase, NodeIdAware {}

export interface AssetContextMenuDownloadAsZip extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuLock extends AssetContextMenuBase, NodeIdAware {}

export interface AssetExpandChildren extends AssetContextMenuBase, OnClickAware {}

export interface IUseAssetActionsHookReturn {
  addFolder: (props: AssetContextMenuDelete) => ItemType
  rename: (props: AssetContextMenuRename) => ItemType
  copy: (props: AssetContextMenuCopy) => ItemType
  paste: (props: AssetContextMenuPaste) => ItemType
  cut: (props: AssetContextMenuCut) => ItemType
  pasteCut: (props: AssetContextMenuPaste) => ItemType
  remove: (props: AssetContextMenuDelete) => ItemType
  downloadAsZip: (props: AssetContextMenuDownloadAsZip) => ItemType
  lock: (props: AssetContextMenuLock) => ItemType
  lockAndPropagate: (props: AssetContextMenuLock) => ItemType
  unlock: (props: AssetContextMenuLock) => ItemType
  unlockAndPropagate: (props: AssetContextMenuLock) => ItemType
  searchAndMove: () => ItemType
  expandChildren: (props: AssetExpandChildren) => ItemType
  refresh: (props: AssetContextMenuRefresh) => ItemType
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type Document } from '@Pimcore/modules/document/document-api-slice.gen'

// Context type definitions for context menu slots
export interface TreeContextMenuProps {
  target: TreeNodeProps
  onComplete?: () => void
}

export interface DocumentEditorContextMenuProps {
  target: Document
  onComplete?: () => void
}

export interface DataObjectEditorContextMenuProps {
  target: DataObject
  onComplete?: () => void
}

export interface AssetEditorContextMenuProps {
  target: Asset
  onComplete?: () => void
}

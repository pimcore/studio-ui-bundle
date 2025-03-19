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

import { TreeContainer as AssetTreeContainer } from '@Pimcore/modules/asset/tree/tree-container'
import { TreeContainer as DataObjectTreeContainer } from '@Pimcore/modules/data-object/tree/tree-container'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import React from 'react'
import { TreeFilterProvider } from './provider/tree-filter-provider/tree-filter-provider'
import { TreePermissionProvider } from './provider/tree-permission-provider/tree-permission-provider'
import { TreeIdProvider } from './provider/tree-id-provider/tree-id-provider'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useNodeApiHook as useNodeApiHookDataObject } from '@Pimcore/modules/data-object/tree/hooks/use-node-api-hook'
import { useNodeApiHook as useNodeApiHookAsset } from '@Pimcore/modules/asset/tree/hooks/use-node-api-hook'
import { NodeApiHookProvider } from '@Pimcore/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider'

export interface TreeWidgetProps {
  id: string
  rootFolderId?: number
  elementType: ElementType
  classes?: string[]
  pql?: string | null
  pageSize?: number | null
  contextPermissions: Record<string, boolean>
  showRoot?: boolean
}
export const TreeWidget = ({ id, elementType, rootFolderId, classes, pql, pageSize, contextPermissions, showRoot = false }: TreeWidgetProps): React.JSX.Element => {
  const { asset_tree_paging_limit: pageSizeAsset, object_tree_paging_limit: pageSizeObject } = useSettings()

  const usedPageSize = pageSize ?? (elementType === elementTypes.asset ? pageSizeAsset : pageSizeObject)

  return (
    <TreeIdProvider treeId={ id }>
      <TreePermissionProvider permissions={ { ...contextPermissions } }>
        <TreeFilterProvider
          classIds={ classes }
          pageSize={ usedPageSize }
          pqlQuery={ pql ?? undefined }
        >
          { elementType === elementTypes.asset && (
          <NodeApiHookProvider nodeApiHook={ useNodeApiHookAsset }>
            <AssetTreeContainer
              id={ rootFolderId ?? 1 }
              showRoot={ showRoot }
            />
          </NodeApiHookProvider>
          )}
          { elementType === elementTypes.dataObject && (

          <NodeApiHookProvider nodeApiHook={ useNodeApiHookDataObject }>
            <DataObjectTreeContainer
              id={ rootFolderId ?? 1 }
              showRoot={ showRoot }
            />
          </NodeApiHookProvider>
          )}
        </TreeFilterProvider>
      </TreePermissionProvider>
    </TreeIdProvider>
  )
}

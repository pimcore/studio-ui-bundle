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
  return (
    <TreePermissionProvider permissions={ { ...contextPermissions } }>
      <TreeFilterProvider
        classIds={ classes }
        pageSize={ pageSize ?? undefined }
        pqlQuery={ pql ?? undefined }
      >
        { elementType === elementTypes.asset && (
        <AssetTreeContainer
          id={ rootFolderId ?? 1 }
          showRoot={ showRoot }
          treeId={ id }
        />
        )}
        { elementType === elementTypes.dataObject && (
        <DataObjectTreeContainer
          id={ rootFolderId ?? 1 }
          showRoot={ showRoot }
          treeId={ id }
        />
        )}
      </TreeFilterProvider>
    </TreePermissionProvider>
  )
}

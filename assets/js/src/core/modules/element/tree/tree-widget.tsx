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
import { useElementGetIdByPathQuery } from '@Pimcore/modules/element/element-api-slice.gen'
import { Box } from '@Pimcore/components/box/box'
import { Skeleton } from '@Pimcore/components/element-tree/skeleton/skeleton'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { TreeFilterProvider } from './provider/tree-filter-provider'

export interface TreeWidgetProps {
  rootFolder: string
  elementType: ElementType
  classes?: string[]
  pql?: string | null
  pageSize?: number | null
}
export const TreeWidget = ({ elementType, rootFolder, classes, pql, pageSize }: TreeWidgetProps): React.JSX.Element => {
  const { data, isLoading, isError, error } = useElementGetIdByPathQuery({
    elementType,
    elementPath: rootFolder
  }, { skip: rootFolder === '' || rootFolder === '/' })

  if (isError) {
    trackError(new ApiError(error))
  }

  if (isLoading) {
    return (
      <Box padding={ 'small' }>
        <Skeleton />
      </Box>
    )
  }

  const rootFolderId = data?.id ?? 1
  return (
    <TreeFilterProvider
      classIds={ classes }
      pageSize={ pageSize ?? undefined }
      pqlQuery={ pql ?? undefined }
    >
      { elementType === elementTypes.asset && (
        <AssetTreeContainer id={ rootFolderId } />
      )}
      { elementType === elementTypes.dataObject && (
        <DataObjectTreeContainer id={ rootFolderId } />
      )}
    </TreeFilterProvider>
  )
}

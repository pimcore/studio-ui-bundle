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

import { useGetTagsQuery } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { TagsTree } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree'
import React from 'react'

export const TagsTreeContainer = (): React.JSX.Element => {
  const { data, isLoading } = useGetTagsQuery({
    page: 1,
    pageSize: 9999
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data?.items === undefined) {
    return <div>Failed to load tags</div>
  }

  return (
    <>
      <TagsTree tags={ data.items } />
    </>
  )
}

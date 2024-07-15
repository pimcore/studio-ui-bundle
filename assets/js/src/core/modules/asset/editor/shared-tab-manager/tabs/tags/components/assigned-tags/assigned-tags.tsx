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

import React, { useContext, useEffect, useState } from 'react'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  type Tag,
  useGetTagsForElementByTypeAndIdQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from 'antd'
import { Grid } from '@Pimcore/components/grid/grid'

type TagWithActions = Tag & {
  actions: React.ReactNode
}

export const AssignedTagsTable = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const [tags, setTags] = useState<Tag[]>([])

  const { data, isLoading } = useGetTagsForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
  })

  useEffect(() => {
    if (data !== undefined) {
      setTags(data.items)
    }
  }, [data])

  const columnHelper = createColumnHelper<TagWithActions>()
  const columns = [
    columnHelper.accessor('path', {
      header: t('asset.asset-editor-tabs.tags.columns.path'),
      meta: {
        type: 'text'
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.tags.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'tags-table--actions-column' }>
            <Button
              icon={ <Icon name="trash" /> }
              onClick={ () => {
                removeTag(info.row.original)
              } }
              type="link"
            />
          </div>
        )
      },
      size: 60
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ tags }
      isLoading={ isLoading }
    />
  )
}

function removeTag (tag: Tag): void {
  throw new Error('Function not implemented.')
}

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

import React, { type Key, useContext, useState } from 'react'
import {
  type Tag,
  useUnassignTagFromElementMutation
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from 'antd'
import { Grid } from '@Pimcore/components/grid/grid'
import { useStyle } from './assigned-tags.styles'
import {
  useOptimisticUpdate
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'
import { flattenArray } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/utils/flattn-tags-array'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'

type TagWithActions = Tag & {
  actions: React.ReactNode
}

export const AssignedTagsTable = ({ tags, isLoading }: { tags: Tag[], isLoading: boolean }): React.JSX.Element => {
  const { t } = useTranslation()
  const [loadingRows, setLoadingRows] = useState({})
  const { id } = useContext(AssetContext)
  const { styles } = useStyle()
  const [unassignTag] = useUnassignTagFromElementMutation()
  const { updateTagsForElementByTypeAndId } = useOptimisticUpdate()
  const flatTags = flattenArray(tags)

  async function removeTag (tag: Tag): Promise<void> {
    const futureCheckedKeys = tags
      .map((tag) => tag.id)
      .filter((key: number) => tag.id !== key)

    updateTagsForElementByTypeAndId({
      elementType: 'asset',
      id: id!,
      flatTags,
      checkedTags: futureCheckedKeys as Key[]
    })

    try {
      await unassignTag({
        elementType: 'asset',
        id: id!,
        tagId: tag.id!
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  const columnHelper = createColumnHelper<TagWithActions>()
  const columns = [
    columnHelper.accessor('path', {
      header: t('asset.asset-editor-tabs.tags.columns.path'),
      meta: {
        type: 'text'
      },
      minSize: 600
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.tags.columns.actions'),
      cell: (info) => {
        const isLoading = loadingRows[info.row.id]

        const handleClick = async (): Promise<void> => {
          setLoadingRows({ ...loadingRows, [info.row.id]: true })
          await removeTag(info.row.original)
          setLoadingRows({ ...loadingRows, [info.row.id]: false })
        }

        return (
          <div className={ 'tags-table--actions-column' }>
            <Button
              disabled={ isLoading }
              icon={ <Icon name="trash" /> }
              loading={ isLoading }
              onClick={ handleClick }
              type="link"
            />
          </div>
        )
      },
      size: 60
    })
  ]

  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ Object.values(tags) }
        isLoading={ isLoading }
      />
    </div>
  )
}

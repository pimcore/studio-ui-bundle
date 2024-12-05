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

import React, { useState } from 'react'
import {
  type Tag,
  useTagUnassignFromElementMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Flex } from 'antd'
import { useMessage } from '@Pimcore/components/message/useMessage'

type TagWithActions = Tag & {
  actions: React.ReactNode
}

export const AssignedTagsTable = ({ tags, isLoading }: { tags: Tag[], isLoading: boolean }): React.JSX.Element => {
  const { t } = useTranslation()
  const [loadingRows, setLoadingRows] = useState<string[]>([])
  const { id, elementType } = useElementContext()
  const messageApi = useMessage()

  const [unassignTag] = useTagUnassignFromElementMutation()

  async function removeTag (tag: Tag): Promise<void> {
    try {
      await unassignTag({
        elementType,
        id,
        tagId: tag.id!
      }).unwrap()
    } catch (error) {
      console.error(error)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: t('failed-to-un-assign-tag-to-element'),
        type: 'error',
        duration: 5
      })
    }
  }

  const columnHelper = createColumnHelper<TagWithActions>()
  const columns = [
    columnHelper.accessor('path', {
      header: t('tags.columns.path'),
      meta: {
        type: 'text'
      },
      minSize: 600,
      sortDescFirst: false
    }),
    columnHelper.accessor('actions', {
      header: t('tags.columns.actions'),
      cell: (info) => {
        const isLoading = loadingRows.includes(info.row.id)

        const handleClick = async (): Promise<void> => {
          setLoadingRows(prevLoadingRows =>
            prevLoadingRows.includes(info.row.id)
              ? prevLoadingRows
              : [...prevLoadingRows, info.row.id]
          ); await removeTag(info.row.original)
          setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((row) => row !== info.row.id))
        }

        return (
          <Flex
            align='center'
            className='w-full h-full'
            justify='center'
          >
            <IconButton
              disabled={ isLoading }
              icon={ { value: 'trash' } }
              loading={ isLoading }
              onClick={ handleClick }
              type="link"
            />
          </Flex>
        )
      },
      size: 60
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ Object.values(tags) }
      initialState={ { sorting: [{ id: 'path', desc: false }] } }
      isLoading={ isLoading }
    />
  )
}

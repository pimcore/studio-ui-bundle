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

import React, { useEffect, useMemo, useState } from 'react'
import { type Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Flex } from 'antd'
import { useHandleCheck } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-handle-check-tags'

type TagWithActions = Tag & {
  actions: React.ReactNode
}

export const AssignedTagsTable = ({ tags, isLoading }: { tags: Tag[], isLoading: boolean }): React.JSX.Element => {
  const { t } = useTranslation()
  const { id: elementId, elementType } = useElementContext()
  // const [loadingRows, setLoadingRows] = useState<string[]>([])
  const [checkedTags, setCheckedTags] = useState<string[]>([])

  console.log('Tags:', tags)
  console.log('----> isLoading', isLoading)

  const validTags = useMemo(() => {
    const tagEntries = Object.entries(tags)
    return tagEntries
      .map(([key, tag]) => ({ ...tag, key }))
      .filter((tag) => tag.id !== undefined)
  }, [tags])

  console.log('validTags:', validTags)
  console.log('validTags dd:', validTags.map((tag) => tag.id!.toString()))

  useEffect(() => {
    if (validTags.length > 0) {
      setCheckedTags(validTags.map((tag) => tag.id!.toString()))
    }
  }, [validTags])

  console.log('Initial Checked Tags:', checkedTags)

  const { handleCheck, loadingNodes } = useHandleCheck({
    elementId,
    elementType,
    flatTags: validTags,
    setDefaultCheckedTags: (tags) => {
      console.log('Updated Tags in setDefaultCheckedTags:', tags)
      setCheckedTags(tags.map(String))
    }
  })

  console.log('----> loadingNodes', loadingNodes)
  console.log('Checked Tags:', checkedTags)

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
        // const isLoading = loadingRows.includes(info.row.id)

        const handleClick = async (): Promise<void> => {
          console.log('----> checkedTags before', checkedTags)

          // setLoadingRows((prevLoadingRows) =>
          //   prevLoadingRows.includes(info.row.id)
          //     ? prevLoadingRows
          //     : [...prevLoadingRows, info.row.id]
          // )

          await handleCheck(
            {
              checked: checkedTags.filter((key) => key !== info.row.original.id!.toString()),
              halfChecked: []
            },
            { node: { key: info.row.original.id!.toString() }, checked: false }
          )

          // setLoadingRows((prevLoadingRows) => prevLoadingRows.filter((row) => row !== info.row.id))
        }

        return (
          <Flex
            align='center'
            className='w-full h-full'
            justify='center'
          >
            <IconButton
              icon={ { value: 'trash' } }
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

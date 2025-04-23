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

import React, { useMemo } from 'react'
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

  const checkedTags = useMemo(() => {
    const tagEntries = Object.entries(tags)
    return tagEntries
      .map(([key, tag]) => ({ ...tag }))
      .filter((tag) => tag.id !== undefined)
  }, [tags])

  const { handleCheck } = useHandleCheck({
    elementId,
    elementType,
    flatTags: checkedTags,
    setDefaultCheckedTags: () => {}
  })

  const handleRemoveTag = async (tagId: string): Promise<void> => {
    const updatedCheckedTags = checkedTags.filter((tag) => tag.id?.toString() !== tagId).map((tag) => tag.id.toString())
    await handleCheck(
      {
        checked: updatedCheckedTags,
        halfChecked: []
      },
      { node: { key: tagId }, checked: false }
    )
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
      enableSorting: false,
      cell: (info) => (
        <Flex
          align="center"
          className='w-full h-full'
          justify="center"
        >
          <IconButton
            aria-label={ t('tags.actions.delete') }
            icon={ { value: 'trash' } }
            onClick={ async () => { await handleRemoveTag(info.row.original.id.toString()) } }
            type="link"
          />
        </Flex>
      ),
      size: 60
    })
  ]

  return (
    <Grid
      columns={ columns }
      data={ Object.values(tags) }
      enableSorting
      isLoading={ isLoading }
      sorting={ [{ id: 'path', desc: false }] }
    />
  )
}

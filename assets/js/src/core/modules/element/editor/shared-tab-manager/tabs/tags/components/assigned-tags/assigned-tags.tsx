/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Flex } from 'antd'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type Tag, useTagUnassignFromElementMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useOptimisticUpdate } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

type TagWithActions = Tag & {
  actions: React.ReactNode
}

export const AssignedTagsTable = ({ tags, isLoading }: { tags: Tag[], isLoading: boolean }): React.JSX.Element => {
  const { t } = useTranslation()

  const { id: elementId, elementType } = useElementContext()
  const { removeTagFromElement } = useOptimisticUpdate()
  const [unassignTag] = useTagUnassignFromElementMutation()

  const handleRemoveTag = async (tagId: number): Promise<void> => {
    const patchResult = removeTagFromElement({ elementType, id: elementId, tagId })

    try {
      await unassignTag({ elementType, id: elementId, tagId })
    } catch {
      patchResult.undo()
      trackError(new GeneralError('Failed to unassign tag from element'))
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
            onClick={ async () => { await handleRemoveTag(info.row.original.id) } }
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

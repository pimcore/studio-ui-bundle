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
  NotesAndEventsTabView
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-view'
import {
  api,
  useNoteDeleteByIdMutation,
  useNoteElementGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useAppDispatch } from '@Pimcore/app/store'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

export const NotesAndEventsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id, elementType } = useElementContext()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const dispatch = useAppDispatch()

  const [deleteNote] = useNoteDeleteByIdMutation()

  const { isLoading, data } = useNoteElementGetCollectionQuery({
    id,
    elementType,
    page,
    pageSize
  })

  async function onClickTrash (id: number): Promise<void> {
    await deleteNote({ id })

    dispatch(
      api.util.invalidateTags(
        invalidatingTags.ELEMENT_NOTES_AND_EVENTS(elementType, id)
      )
    )
  }

  if (isLoading) {
    return <Content loading />
  }

  return (
    <NotesAndEventsTabView
      elementId={ id }
      elementType={ elementType }
      notes={ data!.items }
      onClickTrash={ onClickTrash }
      pagination={
        <Pagination
          current={ page }
          onChange={ (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          } }
          showSizeChanger
          showTotal={ (total) => t('pagination.show-total', { total }) }
          total={ data!.totalItems }
        />
      }
    />
  )
}

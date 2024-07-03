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
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-view'
import {
  useCreateNoteForElementMutation,
  useDeleteNoteMutation,
  useGetNotesForElementByTypeAndIdQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'

export const NotesAndEventsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const [deleteNote] = useDeleteNoteMutation()
  const [createNote] = useCreateNoteForElementMutation()

  const { isLoading, data } = useGetNotesForElementByTypeAndIdQuery({
    id: context?.config?.id,
    elementType: 'asset',
    page,
    pageSize
  })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <NotesAndEventsTabView
      notes={ data!.items }
      onClickSaveNote={
        async (type, title, description): Promise<void> => {
          await createNote({
            elementType: 'asset',
            id: context?.config?.id,
            createNote: {
              type,
              title,
              description
            }
          })
        } }
      onClickTrash={
        async (id: number): Promise<void> => {
          await deleteNote({
            id
          })
        } }
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

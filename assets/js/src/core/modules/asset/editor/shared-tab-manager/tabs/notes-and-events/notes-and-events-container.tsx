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

import React, { useContext, useState } from 'react'
import {
  NotesAndEventsTabView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-view'
import {
  useNoteDeleteByIdMutation,
  useNoteElementGetCollectionQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { Result } from 'antd'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'

export const NotesAndEventsTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)

  if (id === undefined) {
    return <Result title="No id" />
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const [deleteNote] = useNoteDeleteByIdMutation()

  const { isLoading, data } = useNoteElementGetCollectionQuery({
    id,
    elementType: 'asset',
    page,
    pageSize
  })

  if (isLoading) {
    return <Content loading />
  }

  return (
    <NotesAndEventsTabView
      elementId={ id }
      elementType="asset"
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

  async function onClickTrash (id: number): Promise<void> {
    await deleteNote({
      id
    })
  }
}

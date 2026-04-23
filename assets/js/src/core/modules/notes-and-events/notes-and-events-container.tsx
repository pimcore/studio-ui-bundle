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
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Table } from '@Pimcore/modules/notes-and-events/table/table'
import { useNotesAndEvents } from '@Pimcore/modules/notes-and-events/hooks/use-global-notes-and-events'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { Box } from '@Pimcore/components/box/box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'

const NotesAndEventsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    totalItems,
    notesAndEvents,
    isLoading,
    isFetching,
    page,
    setPage,
    setPageSize,
    setFilter
  } = useNotesAndEvents()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ isFetching }
            icon={ { value: 'refresh' } }
            onClick={ () => {
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.NOTES_AND_EVENTS()
                )
              )
            } }
          />

          {notesAndEvents.length !== 0 && (
            <Pagination
              current={ page }
              onChange={ (page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
              } }
              showSizeChanger
              showTotal={ (total) => t('pagination.show-total', { total }) }
              total={ totalItems }
            />
          )}
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          }
                    }
          theme='secondary'
        >
          <Title>{t('notes-and-events.label')}</Title>
          <SearchInput
            loading={ isFetching }
            onSearch={ (value) => {
              setFilter(value)
            } }
            placeholder="Search"
            withPrefix={ false }
            withoutAddon={ false }
          />
        </Toolbar>
            }
    >
      <Content
        loading={ isLoading }
        none={ notesAndEvents.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            notesAndEvents={ notesAndEvents }
            notesAndEventsFetching={ isFetching }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}

export { NotesAndEventsContainer }

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

const NotesAndEventsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
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
      renderToolbar={ notesAndEvents.length !== 0
        ? (
          <Toolbar
            justify='flex-end'
            theme='secondary'
          >
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
          </Toolbar>
          )
        : undefined }
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

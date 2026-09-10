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
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { FieldFilters } from '@Pimcore/components/field-filters/field-filters'
import {
  FilterCommitProvider,
  FiltersRenderer,
  type FilterValues,
  commitFilterValues
} from '@Pimcore/components/filters'
import { notesFilterDescriptors, useNotesAppliedFilters, useNotesDraftFilters, useNotesFilterContext } from '@Pimcore/modules/notes-and-events/filters/filters'
import { useNotesFieldFilterEditor } from '@Pimcore/modules/notes-and-events/filters/hooks/use-notes-field-filter-editor'
import { type NotesFilterColumn } from '@Pimcore/modules/notes-and-events/filters/types'

export const SearchFiltersTab = (): React.JSX.Element => {
  const { t } = useTranslation()

  const draftStore = useNotesDraftFilters()
  const appliedStore = useNotesAppliedFilters()
  const filterContext = useNotesFilterContext()

  /**
   * Publishes the draft, i.e. what the "Apply" button does. `committed` carries the value of a
   * filter that applies itself immediately (Enter in the search field or in a text field
   * filter): its draft write happens in the same render, so it is not in the draft here yet.
   */
  const applyFilters = (committed?: FilterValues): void => {
    commitFilterValues(appliedStore, draftStore.values, committed)
  }

  const { filters, onFilterChange, onFilterCommit, columnGroups, handleColumnClick } = useNotesFieldFilterEditor({
    onCommit: (fieldFilters) => { applyFilters({ fieldFilters }) }
  })

  const handleApplyFilters = (): void => { applyFilters() }

  const handleClearFilters = (): void => { draftStore.reset() }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <ColumnPickerPopover<NotesFilterColumn>
            data-testid="notes-filters-add"
            flat
            groups={ columnGroups }
            onSelect={ (item) => { handleColumnClick(item.meta!) } }
            placement="leftBottom"
          >
            <IconTextButton
              data-testid="notes-filters-add-column-button"
              icon={ { value: 'new' } }
              type='default'
            >
              {t('listing.add-column')}
            </IconTextButton>
          </ColumnPickerPopover>

          <Flex gap='extra-small'>
            <IconTextButton
              data-testid="notes-filters-clear-button"
              icon={ { value: 'close' } }
              onClick={ handleClearFilters }
              type='link'
            >
              {t('sidebar.clear-all-filters')}
            </IconTextButton>

            <Button
              data-testid="notes-filters-apply-button"
              onClick={ handleApplyFilters }
              type='primary'
            >
              {t('button.apply')}
            </Button>
          </Flex>
        </Toolbar>
      }
    >
      <Content padded>
        <Title>{t('sidebar.search_filter')}</Title>
        <Flex
          gap='small'
          style={ { width: '100%' } }
          vertical
        >
          { /* Lets a control apply on its own, e.g. Enter in the search field */ }
          <FilterCommitProvider onCommit={ applyFilters }>
            <FiltersRenderer
              context={ filterContext }
              descriptors={ notesFilterDescriptors }
              section='search'
              store={ draftStore }
            />
          </FilterCommitProvider>
        </Flex>

        <Title>{t('element.sidebar.field-filters')}</Title>

        { filters.length === 0
          ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
          : (
            <FieldFilters
              data={ filters }
              onChange={ onFilterChange }
              onCommit={ onFilterCommit }
            />
            ) }
      </Content>
    </ContentLayout>
  )
}

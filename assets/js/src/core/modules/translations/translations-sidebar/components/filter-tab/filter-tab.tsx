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
import { FiltersRenderer } from '@Pimcore/components/filters'
import { translationsFilterDescriptors, useTranslationsAppliedFilters, useTranslationsDraftFilters, useTranslationsFilterContext } from '@Pimcore/modules/translations/filters/filters'
import { useTranslationsFieldFilterEditor } from '@Pimcore/modules/translations/filters/hooks/use-translations-field-filter-editor'
import { type TranslationFilterColumn } from '@Pimcore/modules/translations/filters/types'

export const FilterTab = (): React.JSX.Element => {
  const { t } = useTranslation()

  const draftStore = useTranslationsDraftFilters()
  const appliedStore = useTranslationsAppliedFilters()
  const filterContext = useTranslationsFilterContext()
  const { filters, onFilterChange, columnGroups, handleColumnClick } = useTranslationsFieldFilterEditor()

  const handleApplyFilters = (): void => { appliedStore.setValues(draftStore.values) }

  const handleClearFilters = (): void => { draftStore.reset() }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <ColumnPickerPopover<TranslationFilterColumn>
            data-testid="translations-filters-add"
            flat
            groups={ columnGroups }
            onSelect={ (item) => { handleColumnClick(item.meta!) } }
            placement="leftBottom"
          >
            <IconTextButton
              data-testid="translations-filters-add-column-button"
              icon={ { value: 'new' } }
              type='default'
            >
              {t('listing.add-column')}
            </IconTextButton>
          </ColumnPickerPopover>

          <Flex gap='extra-small'>
            <IconTextButton
              data-testid="translations-filters-clear-button"
              icon={ { value: 'close' } }
              onClick={ handleClearFilters }
              type='link'
            >
              {t('sidebar.clear-all-filters')}
            </IconTextButton>

            <Button
              data-testid="translations-filters-apply-button"
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
          <FiltersRenderer
            context={ filterContext }
            descriptors={ translationsFilterDescriptors }
            section='search'
            store={ draftStore }
          />
        </Flex>

        <Title>{t('element.sidebar.field-filters')}</Title>

        { filters.length === 0
          ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
          : (
            <FieldFilters
              data={ filters }
              onChange={ onFilterChange }
            />
            ) }
      </Content>
    </ContentLayout>
  )
}

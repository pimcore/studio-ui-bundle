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
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Empty } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { FieldFilters } from '@Pimcore/components/field-filters/field-filters'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { FilterCommitProvider, FiltersRenderer } from '@Pimcore/components/filters'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { useDraftFilters, useElementFilterContext, elementFilterDefinitions } from '../../../../../element-filters'
import { useFilterPanel } from './use-filter-panel'

export const FilterContainerInner = (): React.JSX.Element => {
  const { t } = useTranslation()

  const draftStore = useDraftFilters()
  const filterContext = useElementFilterContext()

  const {
    isPqlFilterEnabled,
    applyFilters,
    onApplyClick,
    onClearAllClick,
    onPqlFilterToggle,
    fieldFilterEditor: { filters, onFilterChange, onFilterCommit, columnGroups, handleColumnClick }
  } = useFilterPanel()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <ColumnPickerPopover<AvailableColumn>
            data-testid="listing-field-filter-add"
            groups={ columnGroups }
            onSelect={ (item) => { handleColumnClick(item.meta!) } }
            placement="leftBottom"
          >
            <IconTextButton
              data-testid="listing-field-filter-add-button"
              icon={ { value: 'new' } }
              type='default'
            >
              {t('listing.add-column')}
            </IconTextButton>
          </ColumnPickerPopover>

          <Flex gap='extra-small'>
            <IconTextButton
              data-testid="listing-filter-clear-button"
              icon={ { value: 'close' } }
              onClick={ onClearAllClick }
              type='link'
            >
              {t('clear-all')}
            </IconTextButton>

            <Button
              data-testid="listing-filter-apply-button"
              onClick={ onApplyClick }
              type='primary'
            >
              {t('button.apply')}
            </Button>
          </Flex>
        </Toolbar>
      }
    >
      <Content padded>
        <Flex
          align='center'
          justify='space-between'
        >
          <Title>{t('sidebar.search_filter')}</Title>
          <Switch
            checked={ isPqlFilterEnabled }
            data-testid="listing-filter-advanced-toggle"
            labelLeft={ <Text>{isPqlFilterEnabled ? t('toggle.pql-filter.disable') : t('toggle.pql-filter.enable')}</Text> }
            onChange={ onPqlFilterToggle }
          />
        </Flex>

        <Form>
          <Flex
            gap='small'
            style={ { width: '100%' } }
            vertical
          >
            { /* Lets a control apply on its own, e.g. Enter in the search field */ }
            <FilterCommitProvider onCommit={ applyFilters }>
              <FiltersRenderer
                context={ filterContext }
                descriptors={ elementFilterDefinitions }
                section='controls'
                store={ draftStore }
              />

              {isPqlFilterEnabled && (
                <FiltersRenderer
                  context={ filterContext }
                  descriptors={ elementFilterDefinitions }
                  section='advanced'
                  store={ draftStore }
                />
              )}
            </FilterCommitProvider>
          </Flex>
        </Form>

        <Title>
          {t('element.sidebar.field-filters')}
        </Title>

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

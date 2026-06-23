/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Empty, Space } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { FieldFilters } from '@Pimcore/components/field-filters/field-filters'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { FiltersRenderer, type FilterValues } from '@Pimcore/components/filters'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useFieldFilterEditor } from './field-filters/use-field-filter-editor'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useGeneralFiltersConfig } from '../../../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import {
  useAppliedFilters,
  useDraftElementFilters,
  useDraftFilters,
  useElementListingFilterContext,
  elementListingFilterDescriptors
} from '../../../../../host'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false)

  const { setPage } = usePaging()
  const { setValues: setAppliedValues } = useAppliedFilters()
  const { handleSearchTermInSidebar, showOnlyUnreferencedFilter } = useGeneralFiltersConfig()
  const { setDataLoadingState } = useData()

  const { searchTerm, directChildren, unreferenced, pql, fieldFilters, reset } = useDraftElementFilters()
  const draftStore = useDraftFilters()
  const filterContext = useElementListingFilterContext()

  const { t } = useTranslation()
  const { filters, onFilterChange, columnGroups, handleColumnClick } = useFieldFilterEditor()

  const handleApplyClick = (): void => {
    const valuesToApply: FilterValues = {
      fieldFilters,
      directChildren,
      pql: isAdvancedMode ? pql : ''
    }

    if (showOnlyUnreferencedFilter === true) {
      valuesToApply.unreferenced = unreferenced
    }

    if (handleSearchTermInSidebar) {
      valuesToApply.searchTerm = searchTerm
    }

    setAppliedValues(valuesToApply)

    setPage(1)
    setDataLoadingState('filters-applied')
  }

  const handleResetAllFiltersClick = (): void => {
    reset()
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          {!isAdvancedMode
            ? (
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
              )
            : <div />}

          <Flex gap='extra-small'>
            <IconTextButton
              data-testid="listing-filter-clear-button"
              icon={ { value: 'close' } }
              onClick={ handleResetAllFiltersClick }
              type='link'
            >
              {t('sidebar.clear-all-filters')}
            </IconTextButton>

            <Button
              data-testid="listing-filter-apply-button"
              onClick={ handleApplyClick }
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
          <Flex gap='extra-small'>
            <Text>{t('toggle.advanced-mode')}</Text>
            <Switch
              checked={ isAdvancedMode }
              data-testid="listing-filter-advanced-toggle"
              onChange={ () => {
                setIsAdvancedMode(!isAdvancedMode)
              } }
            />
          </Flex>
        </Flex>

        {isAdvancedMode
          ? (
            <FiltersRenderer
              context={ filterContext }
              descriptors={ elementListingFilterDescriptors }
              section='advanced'
              store={ draftStore }
            />
            )
          : (
            <>
              <Form>
                <Space
                  direction='vertical'
                  style={ { width: '100%' } }
                >
                  <FiltersRenderer
                    context={ filterContext }
                    descriptors={ elementListingFilterDescriptors }
                    section='controls'
                    store={ draftStore }
                  />
                </Space>
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
                  />
                  ) }
            </>
            )}
      </Content>
    </ContentLayout>
  )
}

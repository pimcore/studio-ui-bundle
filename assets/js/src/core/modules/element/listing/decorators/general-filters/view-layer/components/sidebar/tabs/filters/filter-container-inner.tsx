/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { getErrorKey, ErrorKeyTypes } from '@Pimcore/modules/app/error-handler'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Checkbox, Empty, Space } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { PQLQueryInput } from '@Pimcore/components/pql-query-input/pql-query-input'
import { FieldFilters } from '@Pimcore/components/field-filters/field-filters'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useFieldFilterEditor } from './field-filters/use-field-filter-editor'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useFilter } from './provider/filter-provider/use-filter'
import { usePqlFilter } from '../../../../../context-layer/provider/pql-filter/use-pql-filter'
import { useFieldFilters } from '../../../../../context-layer/provider/field-filters/use-field-filters'
import {
  useDirectChildrenFilter
} from '../../../../../context-layer/provider/direct-children-filter/use-direct-children-filter'
import {
  useUnreferencedFilter
} from '../../../../../context-layer/provider/unreferenced-filter/use-unreferenced-filter'
import { useSearchTermFilter } from '../../../../../context-layer/provider/search-term-filter/use-search-term-filter'
import { useGeneralFiltersConfig } from '../../../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { SearchTermFilter } from '../../../search/search-term-filter'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false)
  const [isShowPqlError, setIsShowPqlError] = useState<boolean>(false)
  const [pqlError, setPqlError] = useState<FetchBaseQueryError | undefined>(undefined)

  const { setPage } = usePaging()
  const { setFieldFilters: setListingFieldFilters } = useFieldFilters()
  const { setOnlyDirectChildren: setListingOnlyDirectChildren } = useDirectChildrenFilter()
  const { setOnlyUnreferenced: setListingOnlyUnreferenced } = useUnreferencedFilter()
  const { setPqlQuery: setListingPqlQuery } = usePqlFilter()
  const { setSearchTerm: setListingSearchTerm } = useSearchTermFilter()
  const { handleSearchTermInSidebar, showOnlyUnreferencedFilter } = useGeneralFiltersConfig()
  const { setDataLoadingState, dataQueryResult } = useData()

  const {
    fieldFilters,
    onlyDirectChildren,
    onlyUnreferenced,
    pqlQuery,
    searchTerm,
    setFieldFilters,
    setOnlyDirectChildren,
    setOnlyUnreferenced,
    setPqlQuery,
    setSearchTerm
  } = useFilter()

  const { t } = useTranslation()
  const { filters, onFilterChange, columnGroups, handleColumnClick } = useFieldFilterEditor()

  useEffect(() => {
    const error = dataQueryResult?.error
    if (dataQueryResult?.isError === true && getErrorKey(error) === ErrorKeyTypes.GDI_PARSING_EXCEPTION) {
      setIsShowPqlError(true)
      setPqlError(error as FetchBaseQueryError)
    }
  }, [dataQueryResult?.error])

  // Reflect a pre-applied PQL query (e.g. from a restored saved search) as advanced mode, so the
  // query is shown and editable instead of silently active behind the regular filters.
  useEffect(() => {
    if (pqlQuery !== '') {
      setIsAdvancedMode(true)
    }
  }, [pqlQuery])

  const handleApplyClick = (): void => {
    setListingFieldFilters(fieldFilters)
    setListingOnlyDirectChildren(onlyDirectChildren)
    setListingPqlQuery(isAdvancedMode ? pqlQuery : '')

    if (showOnlyUnreferencedFilter === true) {
      setListingOnlyUnreferenced(onlyUnreferenced)
    }

    if (handleSearchTermInSidebar) {
      setListingSearchTerm(searchTerm)
    }

    setPage(1)
    setDataLoadingState('filters-applied')
  }

  const handleResetAllFiltersClick = (): void => {
    setFieldFilters([])
    setOnlyDirectChildren(false)
    setOnlyUnreferenced(false)
    setPqlQuery('')

    if (handleSearchTermInSidebar) {
      setSearchTerm('')
    }
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
            <PQLQueryInput
              errorData={ pqlError }
              handleChange={ (val) => {
                setPqlQuery(val)
                setIsShowPqlError(false)
                setPqlError(undefined)
              } }
              isShowError={ isShowPqlError }
              value={ pqlQuery }
            />
            )
          : (
            <>
              <Form>
                <Space
                  direction='vertical'
                  style={ { width: '100%' } }
                >
                  {handleSearchTermInSidebar && (
                    <SearchTermFilter />
                  )}

                  <Checkbox
                    checked={ onlyDirectChildren }
                    onChange={ (e) => { setOnlyDirectChildren(e.target.checked) } }
                  >
                    {t('element.sidebar.filter.only-direct-children')}
                  </Checkbox>

                  {showOnlyUnreferencedFilter === true && (
                    <Checkbox
                      checked={ onlyUnreferenced }
                      onChange={ (e) => { setOnlyUnreferenced(e.target.checked) } }
                    >
                      {t('element.sidebar.filter.only-unreferenced')}
                    </Checkbox>
                  )}
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

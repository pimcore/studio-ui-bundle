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

import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Checkbox, Form, Space } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { PQLQueryInput } from '@Pimcore/components/pql-query-input/pql-query-input'
import React, { useEffect, useState } from 'react'
import { FieldFiltersContainer } from './field-filters/field-filters-container'
import { useFilters } from './hooks/use-filters'
import { usePQLQueryFilter } from './hooks/use-pql-query-filter'
import { useSearchFilter } from './hooks/use-search-filter'
import { useIncludeDescendantsFilter } from './hooks/use-include-descendants-filter'
import { useListFilterOptions } from '../../hooks/use-list'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import {
  DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/constants/filters'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false)

  const { resetFilters, filterOptions, filterError } = useFilters()
  const { setFilterOptions } = useListFilterOptions()
  const { isIncludeDescendants, setIsIncludeDescendants, handleChangeIsIncludeDescendants } = useIncludeDescendantsFilter()
  const {
    pqlQueryValue,
    setPQLQueryValue,
    handleChangePQLQueryValue,
    handleSavePQLQueryValue,
    isShowPQLQueryError,
    setIsShowPQLQueryError
  } = usePQLQueryFilter()
  const { searchValue, setSearchValue, handleChangeSearchValue, handleSaveSearchValue } = useSearchFilter()

  useEffect(() => {
    if (!isEmptyValue(filterError)) {
      setIsShowPQLQueryError(true)
    }
  }, [filterError])

  const handleApplyClick = (): void => { setFilterOptions('filters', filterOptions) }

  const handleResetAllFiltersClick = (): void => {
    setIsIncludeDescendants(DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE)
    setPQLQueryValue('')
    setSearchValue('')
    setIsShowPQLQueryError(false)

    resetFilters()
  }

  return (
    <ContentToolbarSidebarLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon='close'
            onClick={ handleResetAllFiltersClick }
            type='link'
          >
            Clear all filters
          </IconTextButton>

          <Button
            onClick={ handleApplyClick }
            type='primary'
          >
            Apply
          </Button>
        </Toolbar>
       }
    >
      <Content padded>
        <Flex
          align='center'
          justify='space-between'
        >
          <Title>Search & Filter</Title>
          <Flex gap='extra-small'>
            <Text>Advanced Mode</Text>
            <Switch
              checked={ isAdvancedMode }
              onChange={ () => { setIsAdvancedMode(!isAdvancedMode) } }
            />
          </Flex>
        </Flex>

        {isAdvancedMode
          ? (
            <PQLQueryInput
              errorData={ filterError }
              handleBlur={ handleSavePQLQueryValue }
              handleChange={ handleChangePQLQueryValue }
              isShowError={ isShowPQLQueryError }
              value={ pqlQueryValue }
            />
            )
          : (
            <>
              <Form>
                <Space
                  direction='vertical'
                  style={ { width: '100%' } }
                >
                  <SearchInput
                    onBlur={ handleSaveSearchValue }
                    onChange={ handleChangeSearchValue }
                    placeholder='Search'
                    value={ searchValue }
                    withClear
                    withPrefix
                    withoutAddon
                  />

                  <Checkbox
                    checked={ isIncludeDescendants }
                    onChange={ handleChangeIsIncludeDescendants }
                  >
                    only direct children
                  </Checkbox>

                  {/* <Checkbox */}
                  {/*  checked={ false } */}
                  {/*  value={ 'referenced' } */}
                  {/* > */}
                  {/*  only unreferenced */}
                  {/* </Checkbox> */}
                </Space>
              </Form>

              <Title>
                Field filters
              </Title>

              <FieldFiltersContainer />
            </>
            )}
      </Content>
    </ContentToolbarSidebarLayout>
  )
}

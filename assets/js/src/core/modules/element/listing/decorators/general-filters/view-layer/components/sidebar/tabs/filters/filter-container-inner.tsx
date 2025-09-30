/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Checkbox, Space } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { PQLQueryInput } from '@Pimcore/components/pql-query-input/pql-query-input'
import { FieldFiltersContainer } from './field-filters/field-filters-container'
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
import { useSearchTermFilter } from '../../../../../context-layer/provider/search-term-filter/use-search-term-filter'
import { useGeneralFiltersConfig } from '../../../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { SearchTermFilter } from '../../../search/search-term-filter'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { FocusProvider } from './focus-context'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { setPage } = usePaging()
  const { setFieldFilters: setListingFieldFilters } = useFieldFilters()
  const { setOnlyDirectChildren: setListingOnlyDirectChildren } = useDirectChildrenFilter()
  const { setPqlQuery: setListingPqlQuery } = usePqlFilter()
  const { setSearchTerm: setListingSearchTerm } = useSearchTermFilter()
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const { setDataLoadingState } = useData()

  const {
    fieldFilters,
    onlyDirectChildren,
    pqlQuery,
    searchTerm,
    setFieldFilters,
    setOnlyDirectChildren,
    setPqlQuery,
    setSearchTerm
  } = useFilter()

  const { t } = useTranslation()

  const handleApplyClick = (): void => {
    setListingFieldFilters(fieldFilters)
    setListingOnlyDirectChildren(onlyDirectChildren)
    setListingPqlQuery(isAdvancedMode ? pqlQuery : '')

    if (handleSearchTermInSidebar) {
      setListingSearchTerm(searchTerm)
    }

    setPage(1)
    setDataLoadingState('filters-applied')
  }

  const handleResetAllFiltersClick = (): void => {
    setFieldFilters([])
    setOnlyDirectChildren(false)
    setPqlQuery('')

    if (handleSearchTermInSidebar) {
      setSearchTerm('')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLOrSVGElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleApplyClick()
    }
  }

  const restoreFocus = (): void => {
    contentRef.current?.focus()
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon={ { value: 'close' } }
            onClick={ handleResetAllFiltersClick }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={ handleApplyClick }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <div
        ref={ contentRef }
        style={ { outline: 'none' } }
      >
        <Content
          onKeyDown={ handleKeyDown }
          padded
        >
          <FocusProvider restoreFocus={ restoreFocus }>
            <Flex
              align='center'
              justify='space-between'
            >
              <Title>{t('sidebar.search_filter')}</Title>
              <Flex gap='extra-small'>
                <Text>{t('toggle.advanced-mode')}</Text>
                <Switch
                  checked={ isAdvancedMode }
                  onChange={ () => {
                    setIsAdvancedMode(!isAdvancedMode)
                  } }
                />
              </Flex>
            </Flex>

            {isAdvancedMode
              ? (
                <PQLQueryInput
                  handleBlur={ (e) => { setPqlQuery(e.target.value) } }
                  handleChange={ (e) => { setPqlQuery(e.target.value) } }
                  isShowError={ false }
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

                      {/* <Checkbox */}
                      {/*  checked={ false } */}
                      {/*  value={ 'referenced' } */}
                      {/* > */}
                      {/*  only unreferenced */}
                      {/* </Checkbox> */}
                    </Space>
                  </Form>

                  <Title>
                    {t('element.sidebar.field-filters')}
                  </Title>

                  <FieldFiltersContainer />
                </>
                )}
          </FocusProvider>
        </Content>
      </div>
    </ContentLayout>
  )
}

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
import { Checkbox, Form, Space, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import { Alert } from '@Pimcore/components/alert/alert'
import Search from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import { FieldFiltersContainer } from './field-filters/field-filters-container'
import { useFilters } from './hooks/use-filters'
import { usePQLQueryFilter } from './hooks/use-pql-query-filter'
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
import { useStyles } from './filter-container-inner.styles'
import { isEmptyValue, isObject } from '@Pimcore/utils/type-utils'

const PQL_DOCUMENTATION_LINK = 'https://pimcore.com/docs/platform/Generic_Data_Index/Searching_For_Data_In_Index/Pimcore_Query_Language/'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isShowTooltip, setIsShowTooltip] = useState<boolean>(false)
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

  const { styles } = useStyles()

  useEffect(() => {
    if (!isEmptyValue(filterError)) {
      setIsShowPQLQueryError(true)
    }
  }, [filterError])

  const handleApplyClick = (): void => { setFilterOptions('filters', filterOptions) }

  const handleResetAllFiltersClick = (): void => {
    setIsIncludeDescendants(DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE)
    setPQLQueryValue('')
    setIsShowPQLQueryError(false)

    resetFilters()
  }

  const getDescription = (): string => {
    if (filterError?.data !== null && isObject(filterError?.data) && 'message' in (filterError?.data as object)) {
      return (filterError?.data as { message: string }).message
    }

    return 'Something went wrong.'
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
            <Flex
              gap='extra-small'
              vertical
            >
              <Flex gap='mini'>
                <Text>PQL Query</Text>
                <div>
                  <Tooltip
                    onOpenChange={ () => { setIsShowTooltip(!isShowTooltip) } }
                    open={ isShowTooltip }
                    title={ (
                      <a
                        className={ styles.link }
                        href={ PQL_DOCUMENTATION_LINK }
                        rel="noreferrer"
                        target="_blank"
                      >
                        {PQL_DOCUMENTATION_LINK}
                      </a>
                    ) }
                    trigger="click"
                  >
                    <QuestionCircleOutlined className={ styles.infoIcon } />
                  </Tooltip>
                </div>
              </Flex>
              <TextArea
                allowClear
                onBlur={ handleSavePQLQueryValue }
                onChange={ handleChangePQLQueryValue }
                placeholder='Type your Query'
                style={ { height: '150px' } }
                value={ pqlQueryValue }
              />
              {isShowPQLQueryError && (
                <Alert
                  banner
                  description={ getDescription() }
                  showIcon
                  type="error"
                />
              )}
            </Flex>
            )
          : (
            <>
              <Form>
                <Space
                  direction='vertical'
                  style={ { width: '100%' } }
                >
                  <Search
                    placeholder='Search'
                    value={ '' }
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

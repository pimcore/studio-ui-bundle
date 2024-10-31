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
import { type CheckboxChangeEvent } from 'antd/es/checkbox'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Switch } from '@Pimcore/components/switch/switch'
import Search from 'antd/es/input/Search'
import React, { useState } from 'react'
import { FieldFiltersContainer } from './field-filters/field-filters-container'
import { useFilters } from './hooks/use-filters'
import { useListFilterOptions } from '../../hooks/use-list'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import {
  DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/constants/filters'

export const FilterContainerInner = (): React.JSX.Element => {
  const [isIncludeDescendants, setIsIncludeDescendants] = useState<boolean>(false)
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false)

  const { resetFilters, filterOptions, updateIsIncludeDescendants } = useFilters()
  const { setFilterOptions } = useListFilterOptions()

  const handleChangeIsIncludeDescendants = (e: CheckboxChangeEvent): void => {
    const includeDescendantsValue = e.target.checked

    setIsIncludeDescendants(includeDescendantsValue)
    updateIsIncludeDescendants(includeDescendantsValue)
  }

  const handleApplyClick = (): void => { setFilterOptions('filters', filterOptions) }

  const handleResetAllFiltersClick = (): void => {
    setIsIncludeDescendants(DEFAULT_IS_INCLUDE_DESCENDANTS_VALUE)
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
            <div>PQL Query</div>
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

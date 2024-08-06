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
import { Toolbar } from '@Pimcore/components/sidebar/toolbar/toolbar'
import { Title } from '@Pimcore/components/title/title'
import { Button, Checkbox, Form, Space } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'
import { FieldFiltersContainer } from './field-filters/field-filters-container'
import { useFilters } from './hooks/use-filters'
import { useListFilterOptions } from '../../hooks/use-list'

export const FilterContainerInner = (): React.JSX.Element => {
  const { resetFilters, filterOptions } = useFilters()
  const { setFilterOptions } = useListFilterOptions()

  return (
    <>
      <Title>Search & Filter</Title>

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
            checked={ false }
            value={ 'direct-children' }
          >
            only direct children
          </Checkbox>

          <Checkbox
            checked={ false }
            value={ 'referenced' }
          >
            only unreferenced
          </Checkbox>
        </Space>
      </Form>

      <Title>
        Field filters
      </Title>

      <FieldFiltersContainer />

      <Toolbar>
        <IconTextButton
          icon='close'
          onClick={ onResetAllFiltersClick }
          type='link'
        >
          Clear all filters
        </IconTextButton>

        <Button
          onClick={ onApplyClick }
          type='primary'
        >
          Apply
        </Button>
      </Toolbar>
    </>
  )

  function onApplyClick (): void {
    setFilterOptions(filterOptions)
  }

  function onResetAllFiltersClick (): void {
    resetFilters()
  }
}

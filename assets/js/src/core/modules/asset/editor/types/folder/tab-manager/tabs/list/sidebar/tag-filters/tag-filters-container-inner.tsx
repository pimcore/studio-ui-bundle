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

import React, { useState } from 'react'
import { TagsTreeFiltersContainer } from './tags-tree-filters-container'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { useTagFilters } from './hooks/use-tag-filters'
import { useListFilterOptions } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'

export const TagFiltersContainerInner = (): React.JSX.Element => {
  const [checkedTagList, setCheckedTagList] = useState<string[]>([])

  const { resetFilters, filterOptions, addOrUpdateFieldFilter } = useTagFilters()
  const { setFilterOptions } = useListFilterOptions()

  const handleApplyClick = (): void => {
    const filterValue = {
      considerChildTags: true,
      tags: checkedTagList
    }

    addOrUpdateFieldFilter(filterValue)
    setFilterOptions(filterOptions)
  }

  const handleResetAllFiltersClick = (): void => { resetFilters() }

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
      <Content
        padded
        padding="small"
      >
        <Title>Tag Filters</Title>

        <TagsTreeFiltersContainer setCheckedTagList={ setCheckedTagList } />
      </Content>

    </ContentToolbarSidebarLayout>
  )
}

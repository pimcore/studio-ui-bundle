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

import React from 'react'
import { TagsTreeContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree-container'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { useTagGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useTagFilters } from './hooks/use-tag-filters'
import { useListFilterOptions } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'

export const TagFiltersContainerInner = (): React.JSX.Element => {
  const { id, elementType } = useElementContext()

  const { data, isLoading } = useTagGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id
  })

  const { setFilterOptions } = useListFilterOptions()
  const { resetFilters, filterOptions } = useTagFilters()

  const handleApplyClick = (): void => { setFilterOptions(filterOptions) }

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

        <TagsTreeContainer
          isLoading={ isLoading }
          tags={ data?.items ?? [] }
        />
      </Content>

    </ContentToolbarSidebarLayout>
  )
}

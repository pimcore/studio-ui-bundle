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
// import { TagsTreeContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree-container'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'

interface TagFiltersContainerProps {
  onSelectedTagsChange?: (tags: React.Key[]) => void
}

export const TagFiltersContainer = ({ onSelectedTagsChange }: TagFiltersContainerProps): React.JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<React.Key[]>([])

  return (
    <ContentToolbarSidebarLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon='close'
            onClick={ clearAllFilters }
            type='link'
          >
            Clear all filters
          </IconTextButton>

          <Button
            onClick={ () => { _onSelectedTagsChange(selectedTags) } }
            type='primary'
          >
            Apply
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Title>Tag Filters</Title>
      </Content>

      {/*

      <TagsTreeContainer
        defaultCheckedTags={ selectedTags }
        setDefaultCheckedTags={ _onSelectedTagsChange }
      />

      */}
    </ContentToolbarSidebarLayout>
  )

  function clearAllFilters (): void {
    setSelectedTags([])
  }

  function _onSelectedTagsChange (tags: React.Key[]): void {
    setSelectedTags(() => {
      if (onSelectedTagsChange !== undefined) {
        onSelectedTagsChange(tags)
      }

      return tags
    })
  }
}

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
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { TagsTreeFiltersContainer } from './tags-tree-filters-container'
import { useTagFilters } from './provider/tag-filters/use-tag-filters'
import { useTagFilter as useListingTagFiler } from '../../../../../context-layer/provider/tag-filter/use-tag-filter'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'

export const TagFiltersContainerInner = (): React.JSX.Element => {
  const { tags, setTags } = useTagFilters()
  const { setTags: setListingTags } = useListingTagFiler()
  const { setPage } = usePaging()

  const handleApplyClick = (): void => {
    setListingTags(tags)
    setPage(1)
  }

  const handleResetAllFiltersClick = (): void => {
    setTags([])
  }

  const tagsAsStringArray = tags.map((tag) => tag.toString())

  const onTagsChange = (tags: string[]): void => {
    setTags(tags.map((tag) => parseInt(tag)))
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

        <TagsTreeFiltersContainer
          checkedKeys={ tagsAsStringArray }
          setCheckedKeys={ onTagsChange }
        />
      </Content>
    </ContentLayout>
  )
}

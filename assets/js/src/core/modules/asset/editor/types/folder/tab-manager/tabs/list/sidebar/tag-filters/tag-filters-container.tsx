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
import { Toolbar } from '@Pimcore/components/sidebar/toolbar/toolbar'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from 'antd'

interface TagFiltersContainerProps {
  onSelectedTagsChange?: (tags: React.Key[]) => void
}

export const TagFiltersContainer = ({ onSelectedTagsChange }: TagFiltersContainerProps): React.JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<React.Key[]>([])
  console.log({ selectedTags, _onSelectedTagsChange })

  return (
    <>
      <Title>Tag Filters</Title>

      {/*

      <TagsTreeContainer
        defaultCheckedTags={ selectedTags }
        setDefaultCheckedTags={ _onSelectedTagsChange }
      />

      */}

      <Toolbar>
        <IconTextButton
          icon='close'
          onClick={ clearAllFilters }
          type='link'
        >
          Clear all filters
        </IconTextButton>

        <Button type="primary">
          Apply
        </Button>
      </Toolbar>
    </>
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

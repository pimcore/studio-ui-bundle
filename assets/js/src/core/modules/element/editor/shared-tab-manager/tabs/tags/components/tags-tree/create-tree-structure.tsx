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

import type { TreeDataNode } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { type TreeAction } from '@Pimcore/modules/tags/tag-configuration-container'
import {
  type TagGetCollectionApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'

export interface CreateTreeStructureProps {
  tags: NonNullable<TagGetCollectionApiResponse['items']>
  loadingNodes: Set<string>
  actions?: TreeAction[]
  rootActions?: TreeAction[]
}

export interface CustomTreeDataNode extends TreeDataNode {
  actions?: TreeAction[]
}
export const createTreeStructure = ({ tags, loadingNodes, actions, rootActions }: CreateTreeStructureProps): CustomTreeDataNode[] => {
  const getTitle = (tagText: string | undefined, isLoading: boolean): React.ReactNode => {
    if (tagText === undefined || tagText === null || tagText.trim() === '') {
      return isLoading
        ? (
          <span>
            <LoadingOutlined style={ { marginLeft: 8 } } />
          </span>
          )
        : null
    }

    return (
      <React.Fragment>
        <span>{tagText}</span>
        {isLoading && (
        <LoadingOutlined style={ { marginLeft: 8 } } />
        )}
      </React.Fragment>
    )
  }

  const isLoading = (id: string): boolean => loadingNodes.has(id)

  function treeWalker (tags: NonNullable<TagGetCollectionApiResponse['items']>): TreeDataNode[] {
    return tags.map((tag) => {
      return {
        key: tag.id.toString(),
        title: getTitle(tag.text, isLoading(tag.id.toString())),
        icon: Icon({
          value: 'tag'
        }),
        disableCheckbox: isLoading(tag.id.toString()),
        children: tag.hasChildren ? treeWalker(tag.children!) : [],
        actions
      }
    })
  }

  return [{
    key: 0,
    title: getTitle('All Tags', isLoading('0')),
    icon: Icon({
      value: 'folder'
    }),
    children: tags.length > 0 ? treeWalker(tags) : [],
    actions: rootActions
  }]
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { TreeDataNode } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { type TreeAction } from '@Pimcore/modules/tags/tag-configuration-container'
import {
  type TagGetCollectionApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { createTreeNodeTestId } from '@Pimcore/utils/test-id-generator'

export interface CreateTreeStructureProps {
  tags: NonNullable<TagGetCollectionApiResponse['items']>
  loadingNodes: Set<string>
  actions?: TreeAction[]
  rootActions?: TreeAction[]
}

export interface CustomTreeDataNode extends TreeDataNode {
  actions?: TreeAction[]
  'data-testid'?: string
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
        icon: <Icon value='tag' />,
        'data-testid': createTreeNodeTestId(tag.id, 'tag'),
        disableCheckbox: isLoading(tag.id.toString()),
        children: tag.hasChildren ? treeWalker(tag.children!) : [],
        actions
      }
    })
  }

  return [{
    key: 0,
    title: getTitle('All Tags', false),
    icon: <Icon value='folder' />,
    'data-testid': createTreeNodeTestId(0, 'folder'),
    children: tags.length > 0 ? treeWalker(tags) : [],
    actions: rootActions
  }]
}

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

import { type GetTagsApiResponse } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import type { TreeDataNode } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

interface UseCreateTreeStructureReturn {
  createTreeStructure: ({ tags }: { tags: NonNullable<GetTagsApiResponse['items']> }) => TreeDataNode[]
}

export const useCreateTreeStructure = (): UseCreateTreeStructureReturn => {
  const createTreeStructure = ({ tags }: { tags: NonNullable<GetTagsApiResponse['items']> }): TreeDataNode[] => {
    function treeWalker (tags: NonNullable<GetTagsApiResponse['items']>): TreeDataNode[] {
      return tags.map((tag) => ({
        key: tag.id!.toString(),
        title: tag.text,
        icon: Icon({
          name: 'tag-02'
        }),
        children: tag.hasChildren === true ? treeWalker(tag.children!) : []
      }))
    }

    return [{
      key: 'root',
      title: 'All Tags',
      icon: Icon({
        name: 'folder'
      }),
      children: tags.length > 0 ? treeWalker(tags) : []
    }]
  }

  return { createTreeStructure }
}

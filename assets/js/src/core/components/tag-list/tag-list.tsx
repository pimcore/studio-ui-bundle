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
import cn from 'classnames'
import { Tag, type TagProps } from '@Pimcore/components/tag/tag'
import { Flex } from '@Pimcore/components/flex/flex'
import { type GapType } from '@Pimcore/types/components/types'

export interface TagListProps {
  list: TagProps[][]
  itemGap?: GapType
  tagListClassNames?: string
  tagListItemClassNames?: string
  wrap?: boolean
}

export const TagList = ({
  list,
  itemGap,
  tagListClassNames,
  tagListItemClassNames,
  wrap = true
}: TagListProps): React.JSX.Element => {
  return (
    <Flex
      gap="small"
      rootClassName={ cn(tagListClassNames) }
      vertical
    >
      {list.map((group, groupIndex) => (
        <Flex
          gap={ itemGap }
          key={ groupIndex }
          rootClassName={ cn(tagListItemClassNames) }
          wrap={ wrap }
        >
          {group.map((item, itemIndex) => (
            <Tag
              key={ `${groupIndex}-${itemIndex}` }
              { ...item }
            >
              {item.children}
            </Tag>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

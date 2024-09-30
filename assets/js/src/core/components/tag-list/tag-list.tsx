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
import { useStyles } from '@Pimcore/components/tag-list/tag-list.styles'

export interface TagListProps {
  list: TagProps[][]
  itemCharMaxLength?: number
  itemRowGap?: number
  itemColGap?: number
  tagListClassNames?: string
  tagListItemClassNames?: string
}

export const TagList = ({ list, itemCharMaxLength, itemRowGap, itemColGap, tagListClassNames, tagListItemClassNames }: TagListProps): React.JSX.Element => {
  const { styles } = useStyles({ itemRowGap, itemColGap })

  return (
    <Flex
      gap="small"
      rootClassName={ cn(tagListClassNames) }
      vertical
    >
      {list.map((group, groupIndex) => (
        <Flex
          className={ styles.tagListGroup }
          key={ groupIndex }
          rootClassName={ cn(tagListItemClassNames) }
          wrap
        >
          {group.map((item, itemIndex) => (
            <Tag
              color={ item?.color }
              iconName={ item?.iconName }
              key={ `${groupIndex}-${itemIndex}` }
              maxLength={ itemCharMaxLength }
            >
              {item.children}
            </Tag>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

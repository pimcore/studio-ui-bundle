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

import { type Meta } from '@storybook/react'
import { TagList } from '@Pimcore/components/tag-list/tag-list'
import { type TagProps } from '@Pimcore/components/tag/tag'

const config: Meta = {
  title: 'Components/General/Tag/TagList',
  component: TagList,
  tags: ['autodocs']
}

const SAMPLE_TAG_LIST: TagProps[][] = [
  [
    { children: 'Tag 1' },
    { children: 'Tag 2' },
    { children: 'Tag 3' }
  ],
  [
    { children: 'Tag 1' },
    { children: 'Tag 2' },
    { children: 'Tag 3' }
  ]
]

export const _default = {
  args: {
    list: SAMPLE_TAG_LIST
  }
}

export const WithLargeGap = {
  args: {
    list: SAMPLE_TAG_LIST,
    itemGap: 'large'
  }
}

export const WithMixedGap = {
  args: {
    list: SAMPLE_TAG_LIST,
    itemGap: {
      x: 'mini',
      y: 'small'
    }
  }
}

export default config

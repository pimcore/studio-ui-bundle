/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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

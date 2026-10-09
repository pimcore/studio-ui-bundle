/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type Meta } from '@storybook/react'
import { ElementTreeTooltip } from './element-tree-tooltip'
import { type TreeNodeProps } from '../node/tree-node'

const node = (props: Partial<TreeNodeProps>): TreeNodeProps => ({
  id: '81',
  type: 'page',
  metaData: { document: {} },
  ...props
}) as unknown as TreeNodeProps

const config: Meta<typeof ElementTreeTooltip> = {
  title: 'Components/Data Display/Element Tree Tooltip',
  component: ElementTreeTooltip,
  args: {
    children: <span>Hover me!</span>,
    node: node({ isPublished: true })
  }
}

export default config

export const _default = {}

// only unpublished elements name their state
export const Unpublished = {
  args: {
    node: node({ isPublished: false })
  }
}

export const Folder = {
  args: {
    node: node({ id: '12', type: 'folder', isPublished: true })
  }
}

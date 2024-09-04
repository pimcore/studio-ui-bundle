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
import { Accordion } from './accordion'
import { type CollapseProps, Tag } from 'antd'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}
export default config

const item1: { children: React.JSX.Element, label: React.JSX.Element | string, key: string, extra?: React.JSX.Element } = {
  key: '1',
  label: <div style={ { display: 'flex', flexDirection: 'column' } }>
    <span>This is panel header 2</span>
    <span style={ { color: 'grey' } }>Subheader</span>
  </div>,

  extra: <Tag className={ ['title-tag', 'title-tag__published'].join(' ') }>
    <Icon
      className="tag-icon"
      name="world"
      options={ { width: '12px', height: '12px' } }
    />
    Published
  </Tag>,
  children: <p>Mount Vesuvius is a stratovolcano, which is an extremely deadly form of volcano.</p>
}

const item2: { children: React.JSX.Element, label: React.JSX.Element | string, key: string, extra?: React.JSX.Element } = {
  key: '2',
  label: 'This is panel header 1',
  children: <p>The ancient Egyptians were the first to tame the cat (in about 3000 BC), and used them to control
    pests.</p>
}

const items: CollapseProps['items'] = [
  item1,
  item2
]
export const _default = {
    args: {
        items: items,
        exclusive: true,
    }
}

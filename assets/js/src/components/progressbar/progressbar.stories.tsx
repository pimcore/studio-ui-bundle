/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { type Meta } from '@storybook/react'
import React from 'react'
import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { Button } from 'antd'

const config: Meta = {
  title: 'Pimcore studio/UI/Progressbar',
  component: (args) => {
    return (
      <div style={ { minWidth: '500px' } }>
        <Progressbar { ...args } />
      </div>
    )
  },
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    status: {
      options: ['success', 'exception', 'normal', 'active'],
      control: { type: 'select' }
    },
    descriptionAction: {
      table: {
        disable: true
      }
    },
    ariaLabel: {
      table: {
        disable: true
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    description: 'Matadata batch edit in progress',
    descriptionAction: (
      <Button
        type={ 'link' }
      >
        Cancel
      </Button>
    ),
    progressStatus: '63% completed',
    percent: 30,
    status: 'active',
    ariaLabel: 'Progressbar with description and status'
  }
}

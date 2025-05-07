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
import React from 'react'
import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { Button } from '@Pimcore/components/button/button'

const config: Meta = {
  title: 'Components/Data Display/Progressbar',
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

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

import type { Meta } from '@storybook/react'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { Button } from '@Pimcore/components/button/button'
import React from 'react'

const config: Meta = {
  title: 'Components/Data Entry/UploadModal',
  component: (args) => {
    const modal = useAlertModal()

    const callbackManager = (): void => {
      switch (args.type) {
        case 'info':
          modal.info({
            content: args.content
          })
          break
        case 'error':
          modal.error({
            content: args.content
          })
          break
        case 'warn':
          modal.warn({
            content: args.content
          })
          break
      }
    }

    return (
      <Button onClick={ callbackManager }>Open modal</Button>
    )
  },
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    type: {
      options: ['info', 'error', 'warn'],
      control: {
        type: 'select',
        labels: {
          open: 'info'
        }
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const Info = {
  args: {
    type: 'info',
    content: 'This is an info message'
  }
}

export const Error = {
  args: {
    type: 'error',
    content: 'This is an info message'
  }
}

export const Warn = {
  args: {
    type: 'warn',
    content: 'This is an info message'
  }
}

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
import React from 'react'
import { Button } from '@Pimcore/components/button/button'
import { useMessage } from '@Pimcore/components/message/useMessage'

const config: Meta = {
  title: 'Components/Feedback/Message',
  component: (args) => {
    const messageApi = useMessage()

    const showMessage = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.open({
        type: args.type,
        content: args.content,
        duration: args.duration
      })
    }

    return (
      <>
        <Button
          onClick={ showMessage }
          type="primary"
        >
          Show Message
        </Button>
      </>
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['error', 'success', 'info', 'warning', 'loading'],
      control: { type: 'select' }
    }
  }
}

export default config

export const _default = {
  args: {
    content: 'This is a pimcore message',
    duration: 3
  }
}

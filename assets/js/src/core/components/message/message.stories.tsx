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

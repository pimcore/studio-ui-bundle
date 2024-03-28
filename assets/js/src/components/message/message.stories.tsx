import { type Meta } from '@storybook/react'
import React from 'react'
import { Button } from 'antd'
import { useMessage } from '@Pimcore/components/message/useMessage'

const config: Meta = {
  title: 'Pimcore studio/UI/Message',
  component: (args) => {
    const [messageApi, contextHolder] = useMessage()

    const showMessage = (): void => {
      void messageApi.open({
        type: args.type,
        content: args.content,
        duration: args.duration
      })
    }

    return (
      <>
        {contextHolder}
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

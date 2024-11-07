import type {Meta} from "@storybook/react";
import {Modal} from "@Pimcore/components/modal/modal";
import {useSimpleModal} from "@Pimcore/components/modal/simple-modal/hooks/use-simple-modal";
import {Button} from "@Pimcore/components/button/button";
import React from "react";

const config: Meta = {
  title: 'Components/Feedback/SimpleModal',
  component: (args) => {
    const modal = useSimpleModal()

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
    },
  },
  tags: ['autodocs']
}

export default config

export const Info = {
  args: {
    type: "info",
    content: "This is an info message"
  }
}

export const Error = {
  args: {
    type: "error",
    content: "This is an info message"
  }
}

export const Warn = {
  args: {
    type: "warn",
    content: "This is an info message"
  }
}

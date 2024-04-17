import { type Meta } from '@storybook/react'
import { useNotification } from './useNotification'
import {Button} from "antd";
import React from 'react';

const config: Meta = {
  title: 'Pimcore studio/UI/Notification',
  component: (args) => {
    const [notificationApi, contextHolder] = useNotification()

    const onClick = () => {
      notificationApi.open({
        collapsable: args.collapsable,
        title: args.title,
        summary: args.summary,
        description: args.description,
        closeIcon: args.closeIcon,
      })
    }

    return (
      <Button
        onClick={onClick}
      >
        Open Notification
      </Button>
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {}
}

export const Collapsable = {
  args: {
    collapsable: true,
    title: 'Creating multiple ZIP',
    summary: (
      <>
        <p>3 actions in progress</p>
        <Button type={"link"}>Cancel all</Button>
      </>
    ),
    closeIcon: false
  }
}

import {type Meta} from '@storybook/react'
import {useNotification} from './useNotification'
import {Button} from "antd";
import React from 'react';
import {Progressbar} from "@Pimcore/components/progressbar/progressbar";
import {NotificationContent} from "@Pimcore/components/notification/notification-content";

const config: Meta = {
  title: 'Pimcore studio/UI/Notification',
  component: (args) => {
    const [notificationApi] = useNotification()

    const onClick = () => {
      notificationApi.success({
        ...args
      })
    }

    return (
      <>
        <Button
          onClick={onClick}
        >
          Open Notification
        </Button>
      </>
    )
  },
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    description: {
      table: {
        disable: true
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {}
}

export const Collapsable = {
  args: {
    duration: 0,
    message: 'Notifications',
    description: (
      <NotificationContent
        completedActions={[
          {description: 'Metadata batch edit in progress', descriptionAction: (<Button type={"link"}>Download</Button>)}
        ]}
        actions={[
          <Progressbar
            description={'Metadata batch edit in progress'}
            descriptionAction={(<Button type={"link"}>Cancel</Button>)}
            progressStatus={'63% completed'}
          />,
          <Progressbar
            description={'all-catalogue-pictures.zip'}
            descriptionAction={<Button type={"link"}>Cancel</Button>}
            progressStatus={'68 / 150 files zipped'}
          />
        ]}
      />
    )
  }
}


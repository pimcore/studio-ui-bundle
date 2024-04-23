import { type Meta } from '@storybook/react'
import { useNotification } from './useNotification'
import { Button } from 'antd'
import React from 'react'
import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { NotificationContent } from '@Pimcore/components/notification/notification-content'

const config: Meta = {
  title: 'Pimcore studio/UI/Notification',
  component: (args) => {
    const [notificationApi] = useNotification()
    const notificationType = typeof args.status === 'string' && args.status !== 'normal'
      ? args.status
      : 'open'

    const onClick = (): void => {
      notificationApi[notificationType]({
        ...args
      })
    }

    return (
      <>
        <Button
          onClick={ onClick }
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
    status: {
      options: ['open', 'success', 'error', 'info', 'warning'],
      control: {
        type: 'select',
        labels: {
          open: 'default'
        }
      }
    },
    description: {
      table: {
        disable: true
      }
    }
  },
  tags: ['autodocs'],
  args: {
    status: 'normal'
  }
}

export default config

export const _default = {
  args: {
    message: 'Notifications',
    duration: 4.5,
    description: (
      <span>Your bookmark list has been shared.</span>
    )
  }
}

export const Collapsable = {
  args: {
    duration: 4.5,
    message: 'Notifications',
    description: (
      <NotificationContent
        actions={ [
          <Progressbar
            description={ 'Metadata batch edit in progress' }
            descriptionAction={ (<Button type={ 'link' }>Cancel</Button>) }
            key={ 0 }
            progressStatus={ '63% completed' }
          />,
          <Progressbar
            description={ 'all-catalogue-pictures.zip' }
            descriptionAction={ <Button type={ 'link' }>Cancel</Button> }
            key={ 1 }
            progressStatus={ '68 / 150 files zipped' }
          />
        ] }
        completedActions={ [
          { key: 0, description: 'Metadata batch edit in progress', descriptionAction: (<Button type={ 'link' }>Download</Button>) }
        ] }
      />
    )
  }
}

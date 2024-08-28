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
import { useNotification } from './useNotification'
import { Button } from '@Pimcore/components/button/button'
import React from 'react'
import { ActionList } from '@Pimcore/components/notification/content/action-list/action-list'

const config: Meta = {
  title: 'Components/Feedback/Notification',
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
    },
    closeIcon: {
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
    closeIcon: null,
    description: (
      <ActionList
        actions={ [
          {
            key: 0,
            description: 'Metadata batch edit in progress',
            progress: 63,
            progressDetail: '63% completed',
            completed: false,
            completedAction: (<Button type={ 'link' }>Download</Button>),
            cancel: () => { console.log('canceled "Metadata batch edit in progress"') }
          },
          {
            key: 1,
            description: 'all-catalogue-pictures.zip',
            progress: 45,
            progressDetail: '68 / 150 files zipped',
            completed: false,
            completedAction: (<Button type={ 'link' }>Download</Button>),
            cancel: () => { console.log('canceled "all-catalogue-pictures.zip"') }
          },
          {
            key: 2,
            description: 'all-catalogue-pictures-de.zip',
            progress: 100,
            progressDetail: '100% completed',
            completed: true,
            completedAction: (
              <Button
                onClick={ () => { console.log('download "all-catalogue-pictures-de.zip"') } }
                type={ 'link' }
              >Download</Button>
            ),
            cancel: () => { console.log('canceled "all-catalogue-pictures-de.zip"') }
          }
        ] }
      />
    )
  }
}

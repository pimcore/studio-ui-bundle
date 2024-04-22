import {type Meta} from '@storybook/react'
import {useNotification} from './useNotification'
import {Button} from "antd";
import React from 'react';
import {Progressbar} from "@Pimcore/components/progressbar/progressbar";

const config: Meta = {
  title: 'Pimcore studio/UI/Notification',
  component: (args) => {
    const [notificationApi, contextHolder] = useNotification()

    const onClick = () => {
      notificationApi.open({
        ...args
      })
    }

    return (
      <>
        {contextHolder}
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
    description: (
      <>
        <Progressbar
          description={'Metadata batch edit in progress'}
          descriptionAction={(<Button type={"link"}>Cancel</Button>)}
          progressStatus={'63% completed'}
        />

        <Progressbar
          description={'all-catalogue-pictures.zip'}
          descriptionAction={<Button type={"link"}>Cancel</Button>}
          progressStatus={'68 / 150 files zipped'}
        />
      </>
    ),
    completedActions: [
      {description: 'Metadata batch edit in progress', descriptionAction: (<Button type={"link"}>Download</Button>)},
    ],
    closeIcon: false
  }
}


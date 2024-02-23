import {type Meta, StoryObj} from '@storybook/react'
import {Modal} from "@Pimcore/components/modal/modal";
import {Button} from "antd";
import React, {useState} from "react";
import {Icon} from "@Pimcore/components/icon/icon";

const config: Meta = {
    title: 'Pimcore studio/UI/Modal',
    component: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open modal</Button>
                <Modal
                    {...args}
                    icon={<Icon name={'close-circle-filled'} />}
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    onOk={() => console.log('clicked "ok"')}
                />
            </>
        )
    },
    argTypes: {
        footerContent: {
            options: ['end', 'space-between'],
            control: { type: 'select' }
        },
        footer: {
          table: {
                disable: true
          }
        }
    },
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
}

export default config

export const _default = {
    args: {
        title: 'Error occurred when creating ZIP',
        content: 'The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.',
        files: ['all-catalogue-pictures.zip', 'all-catalogue-pictures-videos-content-materials.zip'],
        footerContent: 'end',
        footer: [
            <Button
                key="cancel"
                onClick={() => console.log('clicked "cancel all ZIP actions"')}
                danger
            >
                Cancel all ZIP actions
            </Button>,
            <Button
                key="details"
                onClick={() => console.log('clicked "see details"')}
                type={'primary'}
            >
                See details
            </Button>
        ]
    }
}

export const SpaceBetweenFooterButtons = {
    args: {
        title: 'Media Player can’t play this file',
        content: 'This video format for the following file is not supported. Try converting it in MP4, MOV or AVI.',
        files: ['all-catalogue-pictures.zip'],
        footerContent: 'space-between',
        footer: [
            <Button
                key="cancel"
                onClick={() => console.log('clicked "cancel all ZIP actions"')}
                type="text"
            >
                Read the technical instructions
            </Button>,
            <Button
                key="details"
                onClick={() => console.log('clicked "see details"')}
                type={'primary'}
            >
                See details
            </Button>
        ]
    }
}

import {type Meta, StoryObj} from '@storybook/react'
import {Modal} from "@Pimcore/components/modal/modal";
import {Button} from "antd";
import React, {useState} from "react";
import {Icon} from "@Pimcore/components/icon/icon";

const config: Meta = {
    title: 'Pimcore studio/UI/Modal',
    component: (args) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open modal</Button>
                <Modal
                    {...args}
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    onOk={() => console.log('clicked "ok"')}
                    footer={[
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
                    ]}
                />
            </>
        )
    },
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
}

export default config

export const _default = {
    args: {
        icon: <Icon name={'home'} />,
        title: 'Error occurred when creating ZIP',
        content: 'The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.',
        files: ['all-catalogue-pictures.zip', 'all-catalogue-pictures-videos-content-materials.zip'],
    }
}

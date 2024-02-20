import { type Meta } from '@storybook/react'
import {Modal} from "@Pimcore/components/modal/modal";
import {Button} from "antd";
import {useState} from "react";
import React from 'react';

const config: Meta = {
    title: 'Pimcore studio/UI/Modal',
    component: (args) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open modal</Button>
                <Modal {...args[0]} open={isOpen} />
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
        title: 'Error occurred when creating ZIP',
        content: 'The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.',
        filesList: ['file1', 'file2', 'file3'],
        open: true,
    }
}

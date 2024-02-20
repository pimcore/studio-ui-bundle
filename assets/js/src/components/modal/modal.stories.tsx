import { type Meta } from '@storybook/react'
import {Modal, ModalProps} from "@Pimcore/components/modal/modal";
import {Button, Space} from "antd";
import React from 'react';

const config: Meta = {
    title: 'Pimcore studio/UI/Modal',
    component: Modal,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
}

export default config

export const _default = {
    args: {
        title: 'Error occurred when creating ZIP',
        content: 'The following files failed while creating their ZIPs. Pressing on See details will load additional options helping to resolve the error.'
    }
}

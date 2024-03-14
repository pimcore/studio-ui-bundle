import {type Meta} from '@storybook/react'
import {Sidebar} from "@Pimcore/components/sidebar/sidebar";

const config: Meta = {
    title: 'Pimcore studio/UI/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export default config

export const _default = {
    args: {
    }
}

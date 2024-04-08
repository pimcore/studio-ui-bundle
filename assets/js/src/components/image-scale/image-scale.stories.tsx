import {type Meta} from '@storybook/react'
import {ImageScale} from "@Pimcore/components/image-scale/image-scale";

const config: Meta = {
    title: 'Pimcore studio/UI/Image Scale',
    component: ImageScale,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export default config

export const _default = {
    args: {}
}

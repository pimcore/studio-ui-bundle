import {type Meta} from '@storybook/react'
import {ImageZoom} from "@Pimcore/components/image-zoom/image-zoom";
import React from 'react';

const config: Meta = {
    title: 'Pimcore studio/UI/Image Zoom',
    component: ImageZoom,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export default config

export const _default = {
    args: {}
}

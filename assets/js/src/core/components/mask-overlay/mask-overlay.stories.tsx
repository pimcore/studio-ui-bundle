import React from 'react'
import { Meta } from '@storybook/react'
import { MaskOverlay } from './mask-overlay'

export default {
    title: 'Components/Data Display/Mask Overlay',
    component: MaskOverlay,
} as Meta

const Template = () => (
    <div style={{ position: 'relative', width: '300px', height: '200px', padding: '20px' }}>
        <MaskOverlay />

        Content under the overlay.
    </div>
)

export const Default = Template.bind({})
Default.args = {}
import { Meta } from '@storybook/react'
import { Slider } from './slider'

export default {
    title: 'Components/Data Entry/Slider',
    component: Slider,
    argTypes: {
        value: { control: 'array' },
        onChange: { action: 'changed' }
    }
} as Meta

export const _default = {
    args: {
        value: 35,
        min: 0,
        max: 100,
        allowClear: true,
        showValue: true,
    }
}
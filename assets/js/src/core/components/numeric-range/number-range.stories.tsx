import { Meta } from '@storybook/react'
import { NumericRange } from './numeric-range'

export default {
    title: 'Components/Data Entry/NumericRange',
    component: NumericRange,
    argTypes: {
        value: { control: 'array' },
        onChange: { action: 'changed' }
    }
} as Meta

export const _default = {
    args: {
        value: [0, 100]
    }
}
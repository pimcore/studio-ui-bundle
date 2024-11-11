import { Meta } from '@storybook/react'
import { NumericRange } from './numeric-range'

const config: Meta = {
    title: 'Components/Data Entry/NumericRange',
    component: NumericRange,
    argTypes: {
        value: { control: 'array' },
        onChange: { action: 'changed' }
    }
}

export default config

export const _default = {
    args: {
        value: [0, 100]
    }
}
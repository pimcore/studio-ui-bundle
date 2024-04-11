import { type Meta } from '@storybook/react'
import { InlineTextfield as InlineTextfieldComponent } from './inline-textfield'

const config: Meta = {
  title: 'Pimcore studio/UI/InlineTextfield',
  component: InlineTextfieldComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: '4',
    defaultClassNameLabel: '',
    onKeyDown: (e) => { console.log(e.key) }
  }
}

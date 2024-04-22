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
    value: '2',
    showDotsValues: ['1', '2', '3', '9', '10'],
    onKeyDown: (e) => {
      if(e.key === 'Enter') {
        e.target.value = ''
        e.target.blur()
      }
      console.log(e.key)
    }
  }
}

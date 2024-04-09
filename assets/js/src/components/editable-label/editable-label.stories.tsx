import { type Meta } from '@storybook/react'
import { EditableLabel as EditableLabelComponent } from './editable-label'

const config: Meta = {
  title: 'Pimcore studio/UI/EditableLabel',
  component: EditableLabelComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    currentPage: 4,
    defaultClassNameLabel: '',
    onKeyDown: (e) => { console.log(e) }
  }
}

import { type Meta } from '@storybook/react'
import { TextEditor as TextEditorComponent } from './text-editor'

const config: Meta = {
  title: 'Pimcore studio/UI/TextEditor',
  component: TextEditorComponent,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: 'Import Test/car-export.csv',
    lineNumbers: false
  }
}

import { type Meta } from '@storybook/react'
import { EditorContainer } from './editor-container'

const config: Meta = {
  title: 'Pimcore studio/Modules/Asset/Editor',
  component: EditorContainer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const Folder = {
  args: {
    id: 1
  }
}

export const Image = {
  args: {
    id: 20
  }
}

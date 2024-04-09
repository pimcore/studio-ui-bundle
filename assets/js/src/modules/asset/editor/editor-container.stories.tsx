import React from 'react'
import { type Meta } from '@storybook/react'
import { EditorContainer } from './editor-container'

const config: Meta = {
  title: 'Pimcore studio/Modules/Asset/Editor',
  component: EditorContainer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
}

export default config

export const folder = {
  args: {
    id: 1
  }
}

export const image = {
  args: {
    id: 20
  }
}

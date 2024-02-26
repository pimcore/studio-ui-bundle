import { type Meta } from '@storybook/react'
import { HorizontalToolbar as HorizontalToolbarComponent } from './horizontal-toolbar'

const config: Meta = {
  title: 'Pimcore studio/UI/AssetEditorToolbar',
  component: HorizontalToolbarComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {

  }
}

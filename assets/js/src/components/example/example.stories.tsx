import { type Meta } from '@storybook/react'
import { Example as ExampleComponent } from './example'

const config: Meta = {
  title: 'Pimcore studio/UI/Example',
  component: ExampleComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: 'Save',
    prefix: 'Unsaved changes!! '
  }
}

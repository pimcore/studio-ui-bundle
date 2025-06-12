import { Meta, StoryObj } from '@storybook/react'
import { Iframe } from './iframe'

const meta: Meta<typeof Iframe> = {
  title: 'Components/Others/Iframe',
  component: Iframe,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The iframe is always 100% width and height of the parent container and shows a loading indicator while loading.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Iframe>

export const Default: Story = {
  args: {
    src: 'https://example.com',
    title: 'Example Iframe',
  },
}

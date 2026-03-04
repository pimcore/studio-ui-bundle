import type { Meta } from '@storybook/react'
import { UrlLink } from './url-link'

const config: Meta = {
  title: 'Components/Controls/UrlLink',
  component: UrlLink,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: 'https://pimcore.com',
    text: 'Pimcore Website'
  }
}

export const NoText = {
  args: {
    value: 'https://pimcore.com'
  }
}

export const Empty = {
  args: {
    value: ''
  }
}

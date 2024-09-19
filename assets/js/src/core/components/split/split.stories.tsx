import type { Meta } from '@storybook/react'
import { Split } from './split'
import React from 'react'
import { Button } from '../button/button';

const config: Meta = {
  title: 'Components/Layout/Spacing/Split',
  component: Split,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config;

export const _default = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <div>Content 2</div>
        <div>Content 3</div>
      </>
    )
  }
}

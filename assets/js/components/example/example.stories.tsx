import React from 'react';
import { Meta } from '@storybook/react';

import { Example as ExampleComponent } from './example';

export default {
  title: 'Pimcore workbench/Example',
  component: ExampleComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} as Meta;

export const _default = {}

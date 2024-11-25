/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Region, type RegionProps } from './region'
import { Box } from '../box/box'

const config: Meta = {
  title: 'Components/Layout/Region',
  component: Region,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<RegionProps> = {
  args: {
    items: [
      {
        region: 'north',
        component: <Box padding={ { x: 'small', y: 'small' } }>North</Box>
      },

      {
        region: 'west',
        component: <Box padding={ { x: 'small', y: 'small' } }>West</Box>
      },

      {
        region: 'center',
        component: <Box padding={ { x: 'small', y: 'small' } }>center</Box>
      },

      {
        region: 'east',
        component: <Box padding={ { x: 'small', y: 'small' } }>East</Box>
      },

      {
        region: 'south',
        component: <Box padding={ { x: 'small', y: 'small' } }>south</Box>
      }
    ],

    layoutDefinition: [
      'north north north',
      'west center east',
      'south south south'
    ]
  }
}

export const NoCenterColumn: StoryObj<RegionProps> = {
  args: {
    items: [
      {
        region: 'north',
        component: <Box padding={ { x: 'small', y: 'small' } }>North</Box>
      },

      {
        region: 'west',
        component: <Box padding={ { x: 'small', y: 'small' } }>West</Box>
      },

      {
        region: 'east',
        component: <Box padding={ { x: 'small', y: 'small' } }>East</Box>
      },

      {
        region: 'south',
        component: <Box padding={ { x: 'small', y: 'small' } }>south</Box>
      }
    ],

    layoutDefinition: [
      'north north',
      'west east',
      'south south'
    ]
  }
}

export const MultipleEastColumns: StoryObj<RegionProps> = {
  args: {
    items: [
      {
        region: 'north',
        component: <Box padding={ { x: 'small', y: 'small' } }>North</Box>
      },

      {
        region: 'west',
        component: <Box padding={ { x: 'small', y: 'small' } }>West</Box>
      },

      {
        region: 'east',
        component: <Box padding={ { x: 'small', y: 'small' } }>East</Box>
      },

      {
        region: 'east1',
        component: <Box padding={ { x: 'small', y: 'small' } }>East1</Box>
      },

      {
        region: 'east2',
        component: <Box padding={ { x: 'small', y: 'small' } }>East2</Box>
      },

      {
        region: 'south',
        component: <Box padding={ { x: 'small', y: 'small' } }>south</Box>
      }
    ],

    layoutDefinition: [
      'north north north north',
      'west east east1 east2',
      'south south south south'
    ]
  }
}

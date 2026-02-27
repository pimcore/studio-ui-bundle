/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { type Meta } from '@storybook/react'
import { Steps } from './steps'

const config: Meta = {
  title: 'Components/Navigation/Steps',
  component: Steps,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    current: 0,
    items: [
      {
        title: 'Data Source',
        description: 'Configure data source'
      },
      {
        title: 'Preview Import',
        description: 'Preview data'
      },
      {
        title: 'Resolver',
        description: 'Configure resolver'
      },
      {
        title: 'Mapping',
        description: 'Map fields'
      },
      {
        title: 'Processing',
        description: 'Processing settings'
      }
    ]
  }
}

export const Interactive = (): React.JSX.Element => {
  const [current, setCurrent] = useState(0)

  return (
    <div style={ { width: '800px' } }>
      <Steps
        current={ current }
        items={ [
          {
            title: 'Data Source',
            description: 'Configure data source'
          },
          {
            title: 'Preview Import',
            description: 'Preview data'
          },
          {
            title: 'Resolver',
            description: 'Configure resolver'
          },
          {
            title: 'Mapping',
            description: 'Map fields'
          },
          {
            title: 'Processing',
            description: 'Processing settings'
          }
        ] }
        onChange={ setCurrent }
      />
      <div style={ { marginTop: '24px', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' } }>
        <h3>Step {current + 1} Content</h3>
        <p>This is the content for step {current + 1}</p>
      </div>
    </div>
  )
}

export const Vertical = {
  args: {
    current: 1,
    direction: 'vertical' as const,
    items: [
      {
        title: 'Data Source',
        description: 'Configure data source'
      },
      {
        title: 'Preview Import',
        description: 'Preview data'
      },
      {
        title: 'Resolver',
        description: 'Configure resolver'
      }
    ]
  }
}

export const Small = {
  args: {
    current: 0,
    size: 'small' as const,
    items: [
      {
        title: 'Data Source'
      },
      {
        title: 'Preview Import'
      },
      {
        title: 'Resolver'
      }
    ]
  }
}

export const NavigationSmall = (): React.JSX.Element => {
  return (
    <div style={ { width: '900px' } }>
      <Steps
        current={ 1 }
        items={ [
          { title: 'Data Source' },
          { title: 'Preview Import' },
          { title: 'Resolver' },
          { title: 'Mapping' },
          { title: 'Processing' }
        ] }
        size="small"
        type="navigation"
      />
    </div>
  )
}

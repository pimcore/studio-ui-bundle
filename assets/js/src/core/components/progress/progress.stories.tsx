/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React from 'react'
import { Progress } from './progress'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  args: {
    percent: 30
  }
}

export default config

export const _default = {}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Circular = {
  args: {
    type: 'circle'
  }
}

export const CircularSuccess = {
  args: {
    percent: 100,
    type: 'circle',
    format: () => (
      <Icon
        colorToken='colorSuccess'
        options={ { width: 38, height: 38 } }
        value='check'
      />
    )
  }
}

export const CircularReject = {
  args: {
    type: 'circle',
    status: 'exception',
    format: () => (
      <Icon
        colorToken='colorError'
        options={ { width: 38, height: 38 } }
        value='close'
      />
    )
  }
}

export const WithTextProgress = {
  args: {
    format: () => 'Text Format'
  }
}

const scores = [
  { mark: 'A', percent: 92, backgroundColor: '#DAECB8', fontColor: '#104400' },
  { mark: 'B', percent: 74, backgroundColor: '#FFE6A0', fontColor: '#4D3C00' },
  { mark: 'C', percent: 51, backgroundColor: '#FFC786', fontColor: '#5D1C00' },
  { mark: 'D', percent: 17, backgroundColor: '#E2B3B3', fontColor: '#57000D' }
]

export const Scores = {
  render: () => (
    <div style={ { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' } }>
      {scores.map(({ mark, percent, backgroundColor, fontColor }) => (
        <div key={ mark }>
          <div style={ { display: 'flex', alignItems: 'center', gap: '10px' } }>
            <span style={ { fontSize: '20px', fontWeight: 900, color: fontColor, minWidth: '16px' } }>
              {mark}
            </span>
            <div style={ { flex: 1 } }>
              <Progress
                format={ () => <span style={ { color: fontColor, fontWeight: 700 } }>{percent}% completed</span> }
                percent={ percent }
                percentPosition={ { align: 'start', type: 'inner' } }
                size={ ['100%', 28] }
                strokeColor={ backgroundColor }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

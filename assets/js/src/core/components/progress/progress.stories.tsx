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
    format: () => <Icon value='check' />
  }
}

export const CircularReject = {
  args: {
    type: 'circle',
    status: 'exception',
    format: () => <Icon value='close' />
  }
}

export const WithTextProgress = {
  args: {
    format: () => 'Text Format'
  }
}

const scores = [
  { mark: 'A', percent: 92, backgroundColor: '#52c41a', fontColor: '#fff' },
  { mark: 'B', percent: 74, backgroundColor: '#95de64', fontColor: '#fff' },
  { mark: 'C', percent: 51, backgroundColor: '#faad14', fontColor: '#fff' },
  { mark: 'D', percent: 17, backgroundColor: '#ff4d4f', fontColor: '#fff' }
]

export const Scores = {
  render: () => (
    <div style={ { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' } }>
      {scores.map(({ mark, percent, backgroundColor, fontColor }) => (
        <div key={ mark }>
          <div style={ { display: 'flex', alignItems: 'center', gap: '10px' } }>
            <span style={ { fontSize: '20px', fontWeight: 900, color: backgroundColor, minWidth: '16px' } }>
              {mark}
            </span>
            <div style={ { flex: 1 } }>
              <Progress
                format={ () => `${percent}% completed` }
                percent={ percent }
                percentPosition={ { align: 'start', type: 'inner' } }
                size={ ['100%', 28] }
                strokeColor={ backgroundColor }
                style={ { '--font-color': fontColor } as React.CSSProperties }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { ConfigProvider, Steps as AntSteps, theme, type StepsProps as AntStepsProps } from 'antd'
import { useStyles } from './steps.styles'

export interface StepItem {
  title: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepsProps {
  current: number
  onChange?: (current: number) => void
  items: StepItem[]
  direction?: 'horizontal' | 'vertical'
  size?: 'default' | 'small'
  type?: 'default' | 'navigation' | 'inline'
  status?: 'wait' | 'process' | 'finish' | 'error'
  className?: string
}

export const Steps = ({
  current,
  onChange,
  items,
  direction = 'horizontal',
  size = 'default',
  type = 'default',
  status,
  className
}: StepsProps): React.JSX.Element => {
  const { styles, cx } = useStyles()
  const { token } = theme.useToken()

  const stepsItems: AntStepsProps['items'] = items.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.icon,
    disabled: item.disabled,
    status: item.status
  }))

  return (
    <ConfigProvider
      theme={ {
        components: {
          Steps: {
            // Chevron arrow color
            navArrowColor: token.colorBorder,
            // Icon size: 24px to match design (size="small" default is 20px)
            iconSizeSM: 24
          }
        }
      } }
    >
      <AntSteps
        className={ cx(styles.steps, className) }
        current={ current }
        direction={ direction }
        items={ stepsItems }
        onChange={ onChange }
        size={ size }
        status={ status }
        type={ type }
      />
    </ConfigProvider>
  )
}

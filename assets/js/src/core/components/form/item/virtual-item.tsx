/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormItemProps } from 'antd'
import React, { useMemo } from 'react'
import { ItemProvider } from './provider/item/item-provider'
import { useStyles } from './virtual-item.styles'
import { Space } from '@Pimcore/components/space/space'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Icon } from '@Pimcore/components/icon/icon'

export interface VirtualItemProps extends FormItemProps {
  children?: React.ReactNode,
  tooltip?: {
    title?: string | React.JSX.Element,
    icon?: React.JSX.Element
  }
}

export const VirtualItem = ({ children, ...props }: VirtualItemProps): React.JSX.Element => {
  const { label, className, hidden, id, rules } = props
  const { styles } = useStyles()

  const isRequired = useMemo(() => {
    if (rules !== undefined && Array.isArray(rules)) {
      return rules.some(rule => 'required' in rule && rule.required)
    }
    return false
  }, [rules])

  return (
    <ItemProvider item={ props }>
      <div
        className={ [className, styles.virtualItem].join(' ') }
        style={ { display: hidden === true ? 'none' : 'block' } }
      >
        {label !== undefined && (
          <div className="virtual-item__label">
            <Space size="mini">
              <label htmlFor={ id }>
                <Space size="extra-small">
                  {label}

                  {props.tooltip !== undefined && (
                    <Tooltip className='virtual-item__tooltip' title={ props.tooltip.title } >
                      {props.tooltip.icon ?? <Icon options={{ width: 14, height: 14 }} value="info-circle" />}
                    </Tooltip>
                  )}
                </Space>                
              </label>
              {isRequired && <span className="required-indicator">*</span>}
            </Space>
          </div>
        )}

        <div>
          {children}
        </div>
      </div>
    </ItemProvider>
  )
}

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
import { Badge as AntBadge, type BadgeProps as AntBadgeProps } from 'antd'

export type BadgeProps = Omit<AntBadgeProps, 'size'> & {
  size?: 'default' | 'small' | 'large'
}

export const Badge = ({ color, size, ...props }: BadgeProps): React.JSX.Element => {
  const isLarge = size === 'large'
  const antSize = isLarge ? 'default' : size

  const largeIndicatorStyles = isLarge
    ? { width: 24, height: 24, minWidth: 24, lineHeight: '24px', borderRadius: 12, fontSize: 12 }
    : {}

  return (
    <AntBadge
      color={ color }
      size={ antSize }
      styles={ {
        indicator: { outline: `1px solid ${color}`, ...largeIndicatorStyles },
        root: { marginRight: '5px' }
      } }
      { ...props }
    />
  )
}

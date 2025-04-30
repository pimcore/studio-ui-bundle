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
import { Badge as AntBadge, type BadgeProps } from 'antd'

export const Badge = ({ color, ...props }: BadgeProps): React.JSX.Element => {
  return (
    <AntBadge
      color={ color }
      styles={ { indicator: { outline: `1px solid ${color}` }, root: { marginRight: '5px' } } }
      { ...props }
    />
  )
}

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

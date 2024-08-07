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

import React, { useState } from 'react'
import { Tooltip } from 'antd'

export interface IconWrapperProps {
  tabKey: string
  openTabKey: string | null
  title: string
  children: React.ReactNode
}
export const IconWrapper = ({ tabKey, openTabKey, title, children }: IconWrapperProps): React.JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const toolTipIsVisible = showTooltip === tabKey && openTabKey !== tabKey

  const handleMouseEnter = (): void => {
    setShowTooltip(tabKey)
  }

  const handleMouseLeave = (): void => {
    setShowTooltip(null)
  }

  return (
    <Tooltip
      arrow={ false }
      open={ toolTipIsVisible }
      placement="top"
      title={ title }
    >
      <div
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
      >
        {children}
      </div>
    </Tooltip>
  )
}

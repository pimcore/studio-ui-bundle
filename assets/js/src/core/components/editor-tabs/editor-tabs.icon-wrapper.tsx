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
  title: string
  children: React.ReactNode
}
export const IconWrapper = ({ tabKey, title, children }: IconWrapperProps): React.JSX.Element => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const toolTipIsVisible = hoveredTab === tabKey && hoveredTab !== activeTab

  const handleMouseEnter = (): void => {
    setHoveredTab(tabKey)
  }

  const handleMouseLeave = (): void => {
    setHoveredTab(null)
  }

  const handleClick = (): void => {
    setActiveTab(tabKey)
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <Tooltip
      arrow={ false }
      open={ toolTipIsVisible }
      placement="top"
      title={ title }
    >
      <div
        onClick={ handleClick }
        onKeyDown={ handleKeyDown }
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        role="button"
        tabIndex={ 0 }
      >
        {children}
      </div>
    </Tooltip>
  )
}

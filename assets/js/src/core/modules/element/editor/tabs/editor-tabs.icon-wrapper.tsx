/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'

export interface IconWrapperProps {
  tabKey: string
  activeTabKey: string | null
  tabKeyInFocus: string | undefined
  tabKeyOutOfFocus: string | undefined
  title: string
  children: React.ReactNode
}
export const IconWrapper = ({ tabKey, activeTabKey, tabKeyInFocus, tabKeyOutOfFocus, title, children }: IconWrapperProps): React.JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  useEffect(() => {
    if (tabKeyInFocus !== undefined) { setShowTooltip(tabKeyInFocus) }
  }, [tabKeyInFocus])

  useEffect(() => {
    if (tabKeyOutOfFocus !== undefined && tabKeyOutOfFocus === showTooltip) { setShowTooltip(null) }
  }, [tabKeyOutOfFocus])

  const toolTipIsVisible = showTooltip === tabKey && activeTabKey !== tabKey

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

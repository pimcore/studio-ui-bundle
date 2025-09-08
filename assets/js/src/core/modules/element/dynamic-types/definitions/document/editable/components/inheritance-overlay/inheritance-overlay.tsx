/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { Dropdown } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './inheritance-overlay.styles'
import { useInheritanceMenu } from '../../hooks/use-inheritance-menu'
import { isNil } from 'lodash'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

export interface InheritanceOverlayProps {
  isInherited: boolean
  onOverwrite: () => void
  className?: string
  children?: React.ReactNode
  display?: string
  hideButtons?: boolean
  addIconSpacing?: boolean
  noPadding?: boolean
  shape?: 'round' | 'angular'
  style?: React.CSSProperties
}

export const InheritanceOverlay = ({
  children,
  isInherited,
  onOverwrite,
  className,
  display = 'inline-block',
  addIconSpacing = false,
  hideButtons = false,
  noPadding = false,
  shape = 'round',
  style
}: InheritanceOverlayProps): React.JSX.Element | null => {
  const { styles } = useStyles({ display, addIconSpacing, hideButtons, noPadding, shape })
  const { inheritanceMenuItems, inheritanceTooltip } = useInheritanceMenu({ onOverwrite })

  const wasEverInheritedRef = useRef(isInherited)
  if (isInherited && !wasEverInheritedRef.current) {
    wasEverInheritedRef.current = true
  }

  if (isNil(children)) {
    return null
  }

  if (!wasEverInheritedRef.current) {
    return <>{children}</>
  }

  return (
    <div
      className={ isInherited ? `${styles.container} ${className ?? ''}` : '' }
      style={ isInherited ? style : { display: 'contents' } }
    >
      {isInherited && (
        <Dropdown
          menu={ { items: inheritanceMenuItems } }
          placement="bottomLeft"
          trigger={ ['click', 'contextMenu'] }
        >
          <Tooltip title={ inheritanceTooltip }>
            <div className={ styles.inheritanceBackground }>
              <div className={ styles.inheritanceIcon }>
                <Icon value="inheritance-active" />
              </div>
            </div>
          </Tooltip>
        </Dropdown>
      )}
      {children}
    </div>
  )
}

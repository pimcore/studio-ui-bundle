/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useRef } from 'react'
import { Dropdown, type MenuProps } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useStyles } from './inheritance-overlay.styles'
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
  const { t } = useTranslation()
  
  const wasEverInheritedRef = useRef(isInherited)
  if (isInherited && !wasEverInheritedRef.current) {
    wasEverInheritedRef.current = true
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'overwrite',
      label: t('document.editable.inheritance.overwrite'),
      onClick: onOverwrite
    }
  ]

  if (isNil(children)) {
    return null
  }

  // Never inherited: no wrapper needed
  if (!wasEverInheritedRef.current) {
    return <>{children}</>
  }

  // Use stable wrapper div to prevent React from unmounting children when isInherited changes
  return (
    <div
      className={ isInherited ? `${styles.container} ${className ?? ''}` : '' }
      style={ isInherited ? style : { display: 'contents' } }
    >
      {isInherited && (
        <Dropdown
          menu={ { items: menuItems } }
          placement="bottomLeft"
          trigger={ ['click', 'contextMenu'] }
        >
          <Tooltip title={ t('document.editable.inheritance.tooltip') }>
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

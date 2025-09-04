/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Dropdown, type MenuProps } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { useStyles } from './inheritance-overlay.styles'
import { isNil } from 'lodash'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

export interface InheritanceOverlayProps {
  children?: ReactNode
  isInherited: boolean
  onOverwrite: () => void
  className?: string
  display?: 'inline' | 'inline-block' | 'block'
  addIconSpacing?: boolean
  style?: React.CSSProperties
}

export const InheritanceOverlay = ({
  children,
  isInherited,
  onOverwrite,
  className,
  display = 'inline-block',
  addIconSpacing = false,
  style
}: InheritanceOverlayProps): React.JSX.Element | null => {
  const { styles } = useStyles({ display, addIconSpacing })
  const { t } = useTranslation()

  const menuItems: MenuProps['items'] = [
    {
      key: 'overwrite',
      label: t('document.editable.inheritance.overwrite'),
      onClick: onOverwrite
    }
  ]

  if (!isInherited) {
    return !isNil(children) ? <>{children}</> : null
  }

  if (!isNil(children)) {
    return (
      <div
        className={ `${styles.container} ${className ?? ''}` }
        style={ style }
      >
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
        {children}
      </div>
    )
  }

  return null
}

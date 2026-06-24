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
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './editable-overlay.styles'
import { useInheritanceMenu } from '../../hooks/use-inheritance-menu'
import { useHighlightEditables } from './use-highlight-editables'
import { isNil } from 'lodash'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

export interface EditableOverlayProps {
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

export const EditableOverlay = ({
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
}: EditableOverlayProps): React.JSX.Element | null => {
  const { styles } = useStyles({ display, addIconSpacing, hideButtons, noPadding, shape })

  const highlightEditables = useHighlightEditables()
  const { inheritanceMenuItems, inheritanceTooltip } = useInheritanceMenu({ onOverwrite })

  const wasEverInheritedRef = useRef(isInherited)
  if (isInherited && !wasEverInheritedRef.current) {
    wasEverInheritedRef.current = true
  }

  if (isNil(children)) {
    return null
  }

  if (!wasEverInheritedRef.current && !highlightEditables) {
    return <>{children}</>
  }

  return (
    <div
      className={ cn(
        {
          [styles.container]: isInherited,
          [styles.highlightContainer]: !isInherited && highlightEditables
        },
        (isInherited || highlightEditables) ? className : undefined
      ) }
      style={ isInherited ? style : (highlightEditables ? undefined : { display: 'contents' }) }
    >
      {highlightEditables && (
        <div className={ styles.highlightOverlay } />
      )}
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

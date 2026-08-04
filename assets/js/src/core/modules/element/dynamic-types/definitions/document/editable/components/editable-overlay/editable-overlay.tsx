/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useRef } from 'react'
import { Dropdown } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './editable-overlay.styles'
import { useInheritanceMenu } from '../../hooks/use-inheritance-menu'
import { useHighlightEditables } from './use-highlight-editables'
import { isNil } from 'lodash'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

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

  const { id: documentId } = useContext(DocumentContext)

  const wasEverInheritedRef = useRef(isInherited)
  if (isInherited && !wasEverInheritedRef.current) {
    wasEverInheritedRef.current = true
  }

  const disableHighlightEditable = (): void => {
    if (!highlightEditables) {
      return
    }

    try {
      getPimcoreStudioApi().document.setHighlightEditables(documentId, false)
    } catch (error) {
      console.warn('Could not disable highlight-editables state on editable interaction:', error)
    }
  }

  if (isNil(children)) {
    return null
  }

  if (!wasEverInheritedRef.current && !highlightEditables) {
    return <>{children}</>
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={ cn(
        {
          [styles.container]: isInherited,
          [styles.highlightContainer]: !isInherited && highlightEditables
        },
        (isInherited || highlightEditables) ? className : undefined
      ) }
      onClick={ disableHighlightEditable }
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

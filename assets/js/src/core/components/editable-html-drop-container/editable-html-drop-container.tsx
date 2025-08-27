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
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Dropdown, type MenuProps } from 'antd'
import { toCssDimension } from '@sdk/utils'
import { Icon } from '@Pimcore/components/icon/icon'
import { Spin } from '@Pimcore/components/spin/spin'
import { Text } from '@Pimcore/components/text/text'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import cn from 'classnames'
import { useStyles } from './editable-html-drop-container.styles'
import { isNil, isEmpty } from 'lodash'

export interface EditableHtmlDropContainerProps {
  hasContent: boolean
  isLoading: boolean
  error?: React.ReactNode
  dropZoneText: string
  renderedContent?: React.ReactNode
  contextMenuItems: MenuProps['items']
  containerStyle?: React.CSSProperties
  className?: string
  width?: number | string
  height?: number | string
  defaultHeight?: number
}

export const EditableHtmlDropContainer = ({
  hasContent,
  isLoading,
  error,
  dropZoneText,
  renderedContent,
  contextMenuItems,
  containerStyle,
  className,
  width,
  height,
  defaultHeight = 100
}: EditableHtmlDropContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { getStateClasses } = useDroppable()

  const renderDroppableOverlay = (): React.JSX.Element => (
    <div className={ styles.droppableOverlay }>
      <span className={ styles.droppableOverlayBox }>
        <Icon
          options={ { height: 24, width: 24 } }
          value="drop-target"
        />
      </span>
    </div>
  )

  const defaultContainerStyle: React.CSSProperties = {
    width: toCssDimension(width),
    height: hasContent ? (toCssDimension(height) ?? 'auto') : toCssDimension(height ?? defaultHeight),
    minHeight: hasContent ? (toCssDimension(height) ?? 'auto') : toCssDimension(defaultHeight),
    overflow: hasContent ? 'auto' : undefined,
    ...containerStyle
  }

  const dndClasses = getStateClasses()
  const isDndValid = dndClasses.includes('dnd--drag-valid')
  const isDndError = dndClasses.includes('dnd--drag-error')
  const isHasContent = hasContent && !isLoading && isNil(error)

  const contentClass = cn(
    {
      [styles.editableHtmlDropContent]: !isHasContent,
      [styles.editableHtmlDropContentFlex]: !isHasContent && !isNil(error),
      [styles.hasContent]: isHasContent,
      [styles.dndValidOutline]: isDndValid && isHasContent,
      [styles.dndValidBorder]: isDndValid && !isHasContent,
      [styles.dndErrorOutline]: isDndError && isHasContent,
      [styles.dndErrorBorder]: isDndError && !isHasContent
    },
    className
  )

  return (
    <Dropdown
      disabled={ isNil(contextMenuItems) || isEmpty(contextMenuItems) }
      menu={ { items: contextMenuItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ contentClass }
        style={ defaultContainerStyle }
      >
        {isLoading && (
          <div className={ styles.loadingInner }>
            <Spin />
          </div>
        )}

        {!isNil(error) && !isLoading && (
          <>
            {error}
            {renderDroppableOverlay()}
          </>
        )}

        {hasContent && !isLoading && isNil(error) && (
          <>
            <Tooltip title={ dropZoneText }>
              <div className={ styles.renderedContent }>
                {renderedContent}
              </div>
            </Tooltip>
            {renderDroppableOverlay()}
          </>
        )}

        {!hasContent && !isLoading && isNil(error) && (
          <div className={ styles.dropZone }>
            <Icon
              options={ { height: 30, width: 30 } }
              value="drop-target"
            />
            <Text>{dropZoneText}</Text>
          </div>
        )}
      </div>
    </Dropdown>
  )
}

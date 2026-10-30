/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { cloneElement, isValidElement, useRef, useState } from 'react'
import { Tooltip as AntTooltip, type TooltipProps } from 'antd'
import { isUndefined } from 'lodash'

/**
 * Delay in seconds before the tooltip of an action button (open, delete, search, upload, ...) appears.
 * These buttons are everywhere and hovered constantly, so their tooltips only show up when the
 * pointer rests on a button, not while it passes over a toolbar.
 */
export const actionTooltipDelay = 0.4

type PressSource = 'pointer' | 'keyboard'

/**
 * A press on the trigger (mouse down, click, Enter or Space) hides the tooltip, so it never covers
 * a menu, modal or popover the press opens. It stays hidden until the pointer leaves the trigger,
 * or focus leaves it after a keyboard press, and shows again on the next hover.
 */
export const Tooltip = (props: TooltipProps): JSX.Element => {
  const { children, open, defaultOpen = false, onOpenChange, trigger = 'hover' } = props
  const [isHoverOpen, setIsHoverOpen] = useState(defaultOpen)
  const [pressedBy, setPressedBy] = useState<PressSource | null>(null)
  const pressedByRef = useRef<PressSource | null>(null)

  const triggers = Array.isArray(trigger) ? trigger : [trigger]
  const hidesOnPress = isValidElement(children) && triggers.includes('hover') && triggers.every((t) => t === 'hover' || t === 'focus')

  if (!hidesOnPress) {
    return (
      <AntTooltip { ...props } />
    )
  }

  const press = (source: PressSource): void => {
    pressedByRef.current = source
    setPressedBy(source)
    setIsHoverOpen(false)
    onOpenChange?.(false)
  }

  const release = (): void => {
    pressedByRef.current = null
    setPressedBy(null)
  }

  const handleOpenChange = (nextOpen: boolean): void => {
    // a hover delay that started before the press still fires after it
    if (nextOpen && pressedByRef.current !== null) {
      return
    }
    setIsHoverOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  const child = children as React.ReactElement
  const childProps = child.props

  const trackedChild = cloneElement(child, {
    onMouseDown: (event: React.MouseEvent) => {
      childProps.onMouseDown?.(event)
      press('pointer')
    },
    onClick: (event: React.MouseEvent) => {
      childProps.onClick?.(event)
      if (pressedByRef.current === null) {
        press(event.detail === 0 ? 'keyboard' : 'pointer')
      }
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      childProps.onKeyDown?.(event)
      if (event.key === 'Enter' || event.key === ' ') {
        press('keyboard')
      }
    },
    onMouseLeave: (event: React.MouseEvent) => {
      childProps.onMouseLeave?.(event)
      release()
    },
    onBlur: (event: React.FocusEvent) => {
      childProps.onBlur?.(event)
      if (pressedByRef.current === 'keyboard') {
        release()
      }
    }
  })

  return (
    <AntTooltip
      { ...props }
      onOpenChange={ handleOpenChange }
      open={ pressedBy === null && (isUndefined(open) ? isHoverOpen : open) }
    >
      {trackedChild}
    </AntTooltip>
  )
}

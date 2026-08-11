/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseToolStripActivationProps {
  activateOnHover: boolean
  disabled: boolean
  /** Used as the accessible name of the keyboard-reachable strip head. */
  label?: string
}

export interface UseToolStripActivationReturn {
  isActivated: boolean
  /**
   * Props for the outermost tool strip element. Empty unless the strip actually
   * reveals its actions (`activateOnHover` and not disabled).
   */
  containerProps: React.HTMLAttributes<HTMLElement>
}

/**
 * Activation state of a tool strip that reveals its actions on demand.
 *
 * The actions are revealed on hover, but also whenever focus is anywhere inside the
 * strip, so keyboard users can discover them (WCAG 2.4.7, 2.4.11). To give keyboard
 * and pointer users an entry point, the strip head itself becomes focusable — the
 * visible part (drag handle plus title) holds no focusable element of its own.
 *
 * Deliberately no `aria-expanded`: while collapsed the actions are only clipped by
 * `overflow: hidden`, never removed from the accessibility tree, so a screen reader
 * reaches them either way and announcing "collapsed" would be wrong.
 */
export const useToolStripActivation = ({
  activateOnHover,
  disabled,
  label
}: UseToolStripActivationProps): UseToolStripActivationReturn => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const [isCollapsedByEscape, setIsCollapsedByEscape] = useState(false)

  const isActivationEnabled = activateOnHover && !disabled

  const isActivated = (() => {
    if (disabled) return false
    if (!activateOnHover) return true
    return isHovered || (isFocusWithin && !isCollapsedByEscape)
  })()

  // Turning activation off detaches the leave and blur handlers, so a pointer or focus that
  // leaves while it is off would leave the flags standing and the strip would come back
  // expanded without being hovered or focused.
  useEffect(() => {
    if (isActivationEnabled) return

    setIsHovered(false)
    setIsFocusWithin(false)
    setIsCollapsedByEscape(false)
  }, [isActivationEnabled])

  const handleMouseEnter = useCallback(() => { setIsHovered(true) }, [])

  const handleMouseLeave = useCallback(() => { setIsHovered(false) }, [])

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    setIsFocusWithin(true)

    // Focus reaching one of the actions lifts an Escape collapse: the actions are
    // clipped while collapsed, so focus must never rest on an invisible button.
    if (event.target !== event.currentTarget) {
      setIsCollapsedByEscape(false)
    }
  }, [])

  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return

    setIsFocusWithin(false)
    setIsCollapsedByEscape(false)
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return

    setIsCollapsedByEscape(true)

    // Keep the user's place: focus returns to the strip head rather than being
    // dropped, which would send the next Tab back to the start of the document.
    event.currentTarget.focus()
  }, [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const container = event.currentTarget

    setIsCollapsedByEscape(false)

    // Clicks on the title or the drag handle have no focusable target of their own.
    if (!container.contains(container.ownerDocument.activeElement)) {
      container.focus()
    }
  }, [])

  const containerProps = useMemo<React.HTMLAttributes<HTMLElement>>(() => {
    if (!isActivationEnabled) return {}

    return {
      tabIndex: 0,
      role: 'group',
      'aria-label': label,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onClick: handleClick
    }
  }, [isActivationEnabled, label, handleMouseEnter, handleMouseLeave, handleFocus, handleBlur, handleKeyDown, handleClick])

  return {
    isActivated,
    containerProps
  }
}

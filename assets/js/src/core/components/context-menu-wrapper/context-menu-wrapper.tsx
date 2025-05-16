/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type ReactElement
} from 'react'
import ReactDOM from 'react-dom'
import useElementVisible from '../../utils/hooks/use-element-visible'
import { isNull } from 'lodash'

export interface ContextMenuWrapperProps {
  children: React.ReactNode
  renderMenu: () => ReactElement
  open?: boolean
  position?: { x: number, y: number }
  onClose?: () => void
}

export interface ContextMenuWrapperHandle {
  openMenuAt: (x: number, y: number) => void
  closeMenu: () => void
}

const ContextMenuWrapper = forwardRef<ContextMenuWrapperHandle, ContextMenuWrapperProps>(
  ({ children, renderMenu, open, position, onClose }, ref) => {
    const isControlled = open !== undefined && position !== undefined
    const [visible, setVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const isWrapperVisible = useElementVisible(wrapperRef, true)

    const openMenuAt = (x: number, y: number): void => {
      const closeEvent = new CustomEvent('closeAllContextMenus')
      window.dispatchEvent(closeEvent)
      setMenuPosition({ x, y })
      setVisible(true)
    }

    const closeMenu = (): void => {
      setVisible(false)
      onClose?.()
    }

    useImperativeHandle(ref, () => ({
      openMenuAt,
      closeMenu
    }))

    const handleContextMenu = (event: React.MouseEvent): void => {
      event.preventDefault()
      openMenuAt(event.clientX, event.clientY)
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        wrapperRef.current !== null &&
          !wrapperRef.current.contains(event.target as Node) &&
          dropdownRef.current !== null &&
          !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      const handleCloseAll = (): void => { closeMenu() }
      window.addEventListener('closeAllContextMenus', handleCloseAll)

      return () => {
        document.removeEventListener('click', handleClickOutside)
        window.removeEventListener('closeAllContextMenus', handleCloseAll)
      }
    }, [])

    useEffect(() => {
      if (!isWrapperVisible) {
        closeMenu()
      }
    }, [isWrapperVisible])

    const shouldRender = isControlled ? open : visible

    // Helper to find all scrollable ancestors + window
    function getScrollableAncestors (element: HTMLElement | null): Array<HTMLElement | Window> {
      const scrollables: Array<HTMLElement | Window> = []
      let parent = element?.parentElement ?? null
      while (!isNull(parent)) {
        const style = window.getComputedStyle(parent)
        const overflowY = style.overflowY
        if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight) {
          scrollables.push(parent)
        }
        parent = parent.parentElement
      }
      scrollables.push(window) // Always listen to window scroll too
      return scrollables
    }

    // Add/remove scroll listeners only when menu is open
    useEffect(() => {
      if (isNull(wrapperRef.current)) return
      if (!shouldRender) return

      const scrollables = getScrollableAncestors(wrapperRef.current)
      const onScroll = (): void => { closeMenu() }

      scrollables.forEach(el => { el.addEventListener('scroll', onScroll) })

      return () => {
        scrollables.forEach(el => { el.removeEventListener('scroll', onScroll) })
      }
    }, [shouldRender])

    const currentPosition = isControlled ? position : menuPosition
    if (shouldRender) {
      console.log('currentPosition', currentPosition)
    }

    return (
      <div
        onContextMenu={ handleContextMenu }
        ref={ wrapperRef }
      >
        {children}
        {shouldRender &&
            ReactDOM.createPortal(
              <div
                key={ `context-menu-${currentPosition.x}-${currentPosition.y}` }
                style={ {
                  position: 'fixed',
                  top: currentPosition.y,
                  left: currentPosition.x,
                  zIndex: 1000
                } }
              >
                <div
                  ref={ dropdownRef }
                  style={ { border: '5px solid red' } }
                >
                  {renderMenu()}</div>
              </div>,
              document.body
            )
          }
      </div>
    )
  }
)

ContextMenuWrapper.displayName = 'ContextMenuWrapper'

export default ContextMenuWrapper

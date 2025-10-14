/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, type Ref, useCallback, useRef, useEffect } from 'react'
import { Dropdown as AntdDropdown, type MenuRef } from 'antd'
import { type DropdownProps } from './dropdown'
import { Menu } from '../menu/menu'
import { useStyle } from './dropdown.styles'
import { isNil, isNull } from 'lodash'

export type DropdownInnerProps = DropdownProps & {
  menuRef?: Ref<MenuRef>
}

export const DropdownInner = ({ menu, onSelect, selectedKeys, menuRef, dropClass, ...props }: DropdownInnerProps): React.JSX.Element => {
  const { styles } = useStyle()
  const dropdownElementRef = useRef<HTMLElement | null>(null)

  const dropdownCallbackRef = useCallback((element: HTMLElement | null) => {
    dropdownElementRef.current = element
  }, [])

  const handleRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isNull(dropdownElementRef.current)) {
      const childElement = dropdownElementRef.current.firstElementChild as HTMLElement
      if (!isNull(childElement)) {
        const syntheticEvent = new MouseEvent('contextmenu', {
          bubbles: true,
          cancelable: true,
          clientX: e.clientX,
          clientY: e.clientY,
          button: 2
        })
        childElement.dispatchEvent(syntheticEvent)
      }
    }
  }, [])

  useEffect(() => {
    if (isNil(dropClass)) {
      return
    }

    const elements = Array.from(document.querySelectorAll(`.${dropClass}`))

    elements.forEach((element) => {
      element.addEventListener('contextmenu', handleRightClick)
    })

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('contextmenu', handleRightClick)
      })
    }
  }, [dropClass, handleRightClick])

  const renderMenuComponent = (): ReactNode => (
    <Menu
      ref={ menuRef }
      rootClassName={ styles.menu }
      { ...menu }
    />
  )

  return (
    <span
      ref={ dropdownCallbackRef }
      style={ { display: 'contents !important' } }
    >
      <AntdDropdown
        { ...props }
        dropdownRender={ renderMenuComponent }
      >

        {props.children}

      </AntdDropdown>
    </span>
  )
}

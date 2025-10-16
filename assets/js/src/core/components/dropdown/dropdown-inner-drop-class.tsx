/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useRef, useEffect } from 'react'
import { type DropdownInnerProps } from './dropdown-inner'
import { DropdownInner } from './dropdown-inner'
import { isNull } from 'lodash'

export interface DropdownInnerDropClassProps extends DropdownInnerProps {
  dropClass: string
}

export const DropdownInnerDropClass = ({ dropClass, ...props }: DropdownInnerDropClassProps): React.JSX.Element => {
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

  return (
    <span
      ref={ dropdownCallbackRef }
      style={ { display: 'contents !important' } }
    >
      <DropdownInner { ...props } />
    </span>
  )
}
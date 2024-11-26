/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useStyles } from './divider.styles'

interface DividerProps {
  onMouseResize?: (event: MouseEvent) => void
  onKeyboardResize?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  withToolbar?: boolean
}

export const Divider = ({ onMouseResize, onKeyboardResize, withToolbar = false }: DividerProps): React.JSX.Element => {
  const dividerRef = useRef<HTMLDivElement>(null)
  const enableResize = useRef(false)

  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  const { styles } = useStyles()

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const isResizable = onMouseResize !== undefined

  // Covered next cases:
  // 1. Divider is hovered
  // 2. Divider is focused by keyboard
  // 3. Mouse is moving out of Divider area
  const isButtonVisible = isResizable && (isHovered || isFocused || isMoving)

  const handleMouseDown = (): void => { enableResize.current = true }

  const handleMouseUp = (event: MouseEvent): void => {
    enableResize.current = false
    setIsMoving(false)

    // Hide resize icon in case if user released click outside divider area
    if (event.target !== dividerRef.current) {
      setIsHovered(false)
    }
  }

  const handleMouseEnter = (): void => { setIsHovered(true) }

  const handleMouseLeave = (): void => { setIsHovered(false) }

  const handleFocus = (): void => { setIsFocused(true) }

  const handleBlur = (): void => { setIsFocused(false) }

  const handleMouseMove = (event: MouseEvent): void => {
    if (enableResize.current && onMouseResize !== undefined) {
      onMouseResize?.(event)
      setIsMoving(true)
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/interactive-supports-focus
    <div
      className={ cn(styles.dividerContainer, { [styles.resizable]: isResizable, [styles.withToolbar]: withToolbar }) }
      onMouseDown={ handleMouseDown }
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
      ref={ dividerRef }
    >
      <div
        className={ styles.divider }
        onBlur={ handleBlur }
        onFocus={ handleFocus }
        onKeyDown={ onKeyboardResize }
        // We should focus on the divider line instead of the divider line wrapper
        role={ 'button' }
        tabIndex={ 0 }
      />

      {isButtonVisible && (
        <IconButton
          className={ styles.iconContainer }
          hideShadow
          icon={ {
            value: 'chevron-selector-horizontal',
            options: { height: 14, width: 14 }
          } }
          type="default"
          variant="static"
        />
      )}
    </div>
  )
}

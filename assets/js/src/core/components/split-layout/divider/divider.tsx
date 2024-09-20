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
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './divider.styles'

export interface DividerProps {
  onResize?: (event: MouseEvent) => void
}

export const Divider = ({ onResize }: DividerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const enableResize = useRef(false)

  const [isHovered, setIsHovered] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const isResizable = onResize !== undefined
  const isButtonVisible = isResizable && (isHovered || isMouseDown)

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div
      className={ [styles.dividerContainer, isResizable ? styles.resizable : ''].join(' ') }
      onMouseDown={ onMouseDown }
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }
      role='button'
      tabIndex={ 0 }
    >
      <div className={ styles.divider } />

      {isButtonVisible && (
        <div className={ styles.iconContainer }>
          <Icon
            className={ styles.icon }
            name={ 'chevron-selector-horizontal' }
            options={ { height: 14, width: 14 } }
          />
        </div>
      )}
    </div>
  )

  function onMouseDown (): void {
    enableResize.current = true
    setIsMouseDown(true)
  }

  function onMouseUp (): void {
    enableResize.current = false
    setIsMouseDown(false)
  }

  function onMouseMove (event: MouseEvent): void {
    if (enableResize.current && onResize !== undefined) {
      onResize(event)
    }
  }

  function handleMouseEnter (): void {
    setIsHovered(true)
  }

  function handleMouseLeave (): void {
    setIsHovered(false)
  }
}

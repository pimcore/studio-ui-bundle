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

import { useStyles } from './divider.styles'
import React, { useRef, useEffect } from 'react'

export interface DividerProps {
  onResize?: (event: MouseEvent) => void
}

export const Divider = ({ onResize }: DividerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const enableResize = useRef(false)

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
      className={ styles.divider }
      onMouseDown={ onMouseDown }
      role='button'
      tabIndex={ 0 }
    />
  )

  function onMouseDown (): void {
    enableResize.current = true
  }

  function onMouseUp (): void {
    enableResize.current = false
  }

  function onMouseMove (event: MouseEvent): void {
    if (enableResize.current && onResize !== undefined) {
      onResize(event)
    }
  }
}

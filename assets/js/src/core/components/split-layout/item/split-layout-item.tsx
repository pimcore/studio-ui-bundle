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

import React, { forwardRef } from 'react'
import { useStyles } from './split-layout-item.styles'
import { Divider } from '../divider/divider'

export interface SplitLayoutItemProps {
  size: number
  children: React.ReactNode
  minSize?: number
  maxSize?: number
  withDivider?: boolean
  onResize?: (event: MouseEvent, item: SplitLayoutItemProps) => void
}

const SplitLayoutItem = (props: SplitLayoutItemProps, ref): React.JSX.Element => {
  const { children, size, minSize, maxSize, withDivider, onResize } = props
  const { styles } = useStyles()

  return (
    <div
      className={ styles.splitLayoutItem }
      ref={ ref }
      style={ {
        width: `${size}%`,
        minWidth: minSize !== undefined ? `${minSize}px` : 'auto',
        maxWidth: maxSize !== undefined ? `${maxSize}px` : 'auto'
      } }
    >
      {children}

      {withDivider === true && (
        <Divider onResize={ onResize !== undefined ? (event) => { onResize(event, props) } : undefined } />
      )}
    </div>
  )
}

const forwardedComponent = forwardRef(SplitLayoutItem)

export { forwardedComponent as SplitLayoutItem }

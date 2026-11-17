/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef } from 'react'
import { useStyles } from './page-layout-pane.styles'

export interface PageLayoutPaneProps {
  /** Width in percent of the layout (default 50). */
  size?: number
  children: React.ReactNode
  /** Minimum width in px. */
  minSize?: number
  /** Maximum width in px. */
  maxSize?: number
}

const Pane = (props: Readonly<PageLayoutPaneProps>, ref: React.ForwardedRef<HTMLDivElement>): React.JSX.Element => {
  const { children, size = 50, minSize, maxSize } = props
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
    </div>
  )
}

export const PageLayoutPane = forwardRef(Pane)

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useStyles } from './grid-cell-preview-wrapper.styles'

interface GridPreviewWrapperProps {
  children: React.ReactNode
  overflow?: 'auto'
}

export const GridCellPreviewWrapper = React.forwardRef<HTMLDivElement, GridPreviewWrapperProps>(
  ({ children, overflow }, ref): React.JSX.Element => {
    const { styles } = useStyles()

    return (
      <div
        className={ [ styles.wrapper, 'grid-cell-preview-wrapper' ].join(' ') }
        ref={ ref }
        style={ { overflow } }
      >
        {children}
      </div>
    )
  }
)

GridCellPreviewWrapper.displayName = 'GridCellPreviewWrapper'

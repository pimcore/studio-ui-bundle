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
import { useStyles } from './grid-content-renderer.styles'

export interface GridContentRendererProps {
  children?: React.ReactNode
}

export const GridContentRenderer = ({ children }: GridContentRendererProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ [styles.gridContentRenderer, 'grid-content-renderer'].join(' ') }>
      {children}
    </div>
  )
}

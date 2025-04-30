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
import { useStyles } from './tool-strip.styles'
import cn from 'classnames'
import { Box } from '../box/box'

export interface ToolStripProps {
  className?: string
  children: React.ReactNode
}

export const ToolStrip = ({ children, className }: ToolStripProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classNames = cn(
    'tool-strip',
    styles['tool-strip'],
    className
  )

  return (
    <Box
      className={ classNames }
      padding={ { x: 'mini', y: 'mini', left: 'extra-small' } }
    >
      {children}
    </Box>
  )
}

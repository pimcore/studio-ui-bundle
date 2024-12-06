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

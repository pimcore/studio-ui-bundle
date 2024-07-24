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
import { useStyles } from './toolbar.styles'

interface ToolbarProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Toolbar = ({ children, className, style, ...props }: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = ['sidebar-toolbar', styles.toolbar, className].join(' ')

  return (
    <div
      className={ classes }
      style={ style }
      { ...props }
    >{children}</div>
  )
}

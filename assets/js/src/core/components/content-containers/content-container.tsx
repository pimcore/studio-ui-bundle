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

import React, { type HTMLAttributes, type ReactNode } from 'react'
import { useStyles } from './content-container.styles'

export interface ContentContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  padded?: boolean
}

export const ContentContainer = ({ children, padded = false, className, ...props }: ContentContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles['content-container'], 'content-container', className]

  if (padded) {
    classes.push('content-container--padded')
  }

  return (
    <div
      className={ classes.join(' ') }
      { ...props }
    >
      {children}
    </div>
  )
}

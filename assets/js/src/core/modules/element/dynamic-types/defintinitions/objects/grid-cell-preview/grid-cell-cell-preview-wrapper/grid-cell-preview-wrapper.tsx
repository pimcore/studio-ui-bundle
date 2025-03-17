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
import { useStyles } from './grid-cell-preview-wrapper.styles'

interface GridPreviewWrapperProps {
  children: React.ReactNode
}

export const GridCellPreviewWrapper = ({ children }: GridPreviewWrapperProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ styles.wrapper } >
      {children}
    </div>
  )
}

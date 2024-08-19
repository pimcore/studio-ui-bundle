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
import {
  useStyles
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/card-header/card-header-container.styles'

export interface CardTitleContainerProps {
  text: string
  children?: React.ReactNode
}

export const CardHeaderContainer = (props: CardTitleContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { text, children } = props

  return (
    <div className={ styles['header-container'] }>
      <span className={ 'header-text' }>{text}</span>
      {children}
    </div>
  )
}

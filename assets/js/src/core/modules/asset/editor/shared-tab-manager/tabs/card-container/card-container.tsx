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
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/card-container/card-container.styles'

export interface CardContainerProps {
  children: React.ReactNode
}

export const CardContainer = (props: CardContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { children } = props

  console.log('----> herc')

  return (
    <div className={ styles['card-container'] }>
      {children}
    </div>
  )
}

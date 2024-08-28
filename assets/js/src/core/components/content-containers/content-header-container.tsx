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
import { Title } from '@Pimcore/components/title/title'
import {
  useStyles
} from '@Pimcore/components/content-containers/content-header-container.styles'

export interface ContentHeaderContainerProps {
  icon?: React.JSX.Element
  text: string
  children?: React.ReactNode
}

export const ContentHeaderContainer = (props: ContentHeaderContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { icon, text, children } = props

  return (
    <div className={ styles['content-header-container'] }>
      <span className={ 'header-text' }>
        <Title icon={ icon }>
          {text}
        </Title>
      </span>
      {children}
    </div>
  )
}

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
} from '@Pimcore/components/content-containers/content-padding-container.styles'
import { Flex } from 'antd'
export interface ContentPaddingContainerProps {
  children: React.ReactNode
}

export const ContentPaddingContainer = (props: ContentPaddingContainerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { children } = props

  return (
    <Flex
      className={ styles['content-padding-container'] }
      vertical
    >
      {children}
    </Flex>
  )
}

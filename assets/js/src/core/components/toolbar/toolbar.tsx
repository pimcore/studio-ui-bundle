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

import { useStyles } from '@Pimcore/components/toolbar/toolbar.styles'
import { Flex, type FlexProps } from 'antd'
import React from 'react'

export interface ToolbarProps {
  children: React.ReactNode
  justify?: FlexProps['justify']
  theme?: 'primary' | 'secondary'
}

export const Toolbar = ({ children, justify = 'space-between', theme = 'primary', ...props }: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [
    styles.toolbar,
    'toolbar',
    `toolbar--theme-${theme}`
  ].join(' ')

  return (
    <Flex
      className={ classes }
      gap={ 16 }
      justify={ justify }
      { ...props }
    >
      {children}
    </Flex>
  )
}

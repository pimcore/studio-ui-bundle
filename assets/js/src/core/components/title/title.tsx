/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TitleProps as AntTitleProps } from 'antd/es/typography/Title'
import { Flex, Typography } from 'antd'
import React from 'react'
import { useStyle } from './title.styles'

const { Title: AntTitle } = Typography

export interface TitleProps extends AntTitleProps {
  icon?: React.JSX.Element
  titleClass?: string
  theme?: 'default' | 'primary' 
}

export const Title = ({ children, icon, titleClass, theme,...props }: TitleProps): React.JSX.Element => {
  const { styles } = useStyle()

    const titleClassNames = [styles.title, 'pimcore-title', `title--theme-${theme}`, titleClass ?? null].join(' ') 

  return (
    <Flex
      align={ 'center' }
      className={ [styles.flex, `title--theme-${theme}`].join(' ')  }
    >
      {icon}
      <AntTitle
        className={ titleClassNames }
        { ...props }
      >{children}</AntTitle>
    </Flex>
  )
}


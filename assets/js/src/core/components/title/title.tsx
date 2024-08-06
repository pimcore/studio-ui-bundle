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

import { type TitleProps as AntTitleProps } from 'antd/es/typography/Title'
import { Typography } from 'antd'
import React from 'react'
import { useStyle } from './title.styles'

const { Title: AntTitle } = Typography

export interface TitleProps extends AntTitleProps {}

export const Title = ({ children, ...props }: TitleProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <AntTitle
      className={ [styles.title, 'pimcore-title'].join(' ') }
      { ...props }
    >{children}</AntTitle>
  )
}

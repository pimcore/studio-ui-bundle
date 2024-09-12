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
import { type TextProps as AntTextProps } from 'antd/es/typography/Text'
import { Typography } from 'antd'

export interface TextProps extends AntTextProps {}

const { Text: AntText } = Typography

export const Text = (props: TextProps): React.JSX.Element => {
  return <AntText { ...props } />
}

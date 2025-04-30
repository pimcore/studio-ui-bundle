/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type TextProps as AntTextProps } from 'antd/es/typography/Text'
import { Typography } from 'antd'

export interface TextProps extends AntTextProps {}

const { Text: AntText } = Typography

export const Text = (props: TextProps): React.JSX.Element => {
  return <AntText { ...props } />
}

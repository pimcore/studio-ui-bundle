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
import { type TextAreaProps } from 'antd/es/input/TextArea'
import { Input } from 'antd'
import cn from 'classnames'
import { useStyles } from './textarea.styles'

export interface ITextAreaProps extends TextAreaProps {
  inherited?: boolean
}

export const TextArea = ({ inherited, className, ...restProps }: ITextAreaProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <Input.TextArea
      className={ cn(styles.textarea, className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}

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
import { Input as AntInput } from 'antd'
import cn from 'classnames'
import { useStyles } from './input-password.styles'
import { type PasswordProps } from 'antd/es/input'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface IInputPasswordProps extends PasswordProps {
  inherited?: boolean
}

export const InputPassword = ({ inherited, className, style, ...restProps }: IInputPasswordProps): JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for password inputs
  const computedStyle = {
    maxWidth: fieldWidths.medium,
    ...style
  }

  return (
    <AntInput.Password
      className={ cn(styles.input, className, { [styles.inherited]: inherited }) }
      style={ computedStyle }
      { ...restProps }
    />
  )
}

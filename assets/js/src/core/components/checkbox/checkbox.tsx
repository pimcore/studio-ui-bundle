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
import { Checkbox as AntCheckbox, type CheckboxProps } from 'antd'
import cn from 'classnames'
import { useStyles } from './checkbox.styles'

export interface ICheckboxProps extends CheckboxProps {
  inherited?: boolean
}

export const Checkbox = ({ inherited, className, ...restProps }: ICheckboxProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntCheckbox
      className={ cn(className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}

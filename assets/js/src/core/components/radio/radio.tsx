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
import { Radio as AntRadio, type RadioProps } from 'antd'
import cn from 'classnames'
import { useStyles } from './radio.styles'
import { type RadioGroupProps } from 'antd/es/radio'

export interface IRadioProps extends RadioProps {
  inherited?: boolean
}

const Radio = ({ inherited, className, ...restProps }: IRadioProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntRadio
      className={ cn(className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}

export interface IRadioGroupProps extends RadioGroupProps {}

const Group = (props: IRadioGroupProps): React.JSX.Element => {
  return (
    <AntRadio.Group { ...props } />
  )
}

Radio.Group = Group

export { Radio }

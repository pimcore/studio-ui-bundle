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
import { type ColorPickerProps, ColorPicker as AntColorPicker } from 'antd'
import cn from 'classnames'
import { useStyles } from './color-picker.styles'

export interface IColorPickerProps extends ColorPickerProps {
  inherited?: boolean
}

export const ColorPicker = ({ inherited, className, ...restProps }: IColorPickerProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntColorPicker
      className={ cn(styles.colorPicker, className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}

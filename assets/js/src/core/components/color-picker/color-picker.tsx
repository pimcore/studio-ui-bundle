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
import { type ColorPickerProps, ColorPicker as AntColorPicker } from 'antd'
import cn from 'classnames'
import { useStyles } from './color-picker.styles'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface IColorPickerProps extends ColorPickerProps {
  inherited?: boolean
}

export const ColorPicker = ({ inherited, className, style, ...restProps }: IColorPickerProps): JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidth()

  // Apply small width as default for color pickers
  const computedStyle = {
    maxWidth: fieldWidths.small,
    ...style
  }

  return (
    <AntColorPicker
      className={ cn(styles.colorPicker, className, { [styles.inherited]: inherited }) }
      style={ computedStyle }
      { ...restProps }
    />
  )
}

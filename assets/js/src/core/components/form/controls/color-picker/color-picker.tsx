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
import { ColorPicker as BaseColorPicker, type IColorPickerProps } from '@Pimcore/components/color-picker/color-picker'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const ColorPicker = ({ style, ...props }: IColorPickerProps): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply small width as default for color pickers
  const computedStyle = {
    width: fieldWidths.small,
    ...style
  }

  return <BaseColorPicker style={computedStyle} {...props} />
}

export type { IColorPickerProps }

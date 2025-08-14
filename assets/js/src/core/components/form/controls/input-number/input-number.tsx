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
import { InputNumber as BaseInputNumber, type IInputNumberProps } from '@Pimcore/components/input-number/input-number'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const InputNumber = ({ style, ...props }: IInputNumberProps): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply small width as default for number inputs
  const computedStyle = {
    width: fieldWidths.small,
    ...style
  }

  return <BaseInputNumber style={computedStyle} {...props} />
}

export type { IInputNumberProps }

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
import { Input as BaseInput, type IInputProps } from '@Pimcore/components/input/input'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const Input = React.forwardRef<any, IInputProps>(({ style, ...props }, ref): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for input fields
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return <BaseInput ref={ref} style={computedStyle} {...props} />
})

Input.displayName = 'FormInput'

export type { IInputProps }

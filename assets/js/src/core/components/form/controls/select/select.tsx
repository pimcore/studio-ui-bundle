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
import { Select as BaseSelect, type SelectProps } from '@Pimcore/components/select/select'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const Select = React.forwardRef<any, SelectProps>(({ style, ...props }, ref): React.JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for select components
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return <BaseSelect ref={ref} style={computedStyle} {...props} />
})

Select.displayName = 'FormSelect'

export type { SelectProps }

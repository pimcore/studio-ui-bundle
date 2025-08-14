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
import { CreatableSelect as BaseCreatableSelect, type CreatableSelectProps } from '@Pimcore/components/creatable-select/creatable-select'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const CreatableSelect = ({ style, ...props }: CreatableSelectProps): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for creatable selects
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return <BaseCreatableSelect style={computedStyle} {...props} />
}

export type { CreatableSelectProps }

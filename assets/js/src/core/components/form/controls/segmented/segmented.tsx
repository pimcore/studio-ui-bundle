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
import { Segmented as BaseSegmented, type SegmentedProps } from '@Pimcore/components/segmented/segmented'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(({ style, ...props }, ref): React.JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for segmented controls
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return <BaseSegmented ref={ref} style={computedStyle} {...props} />
})

Segmented.displayName = 'FormSegmented'

export type { SegmentedProps }

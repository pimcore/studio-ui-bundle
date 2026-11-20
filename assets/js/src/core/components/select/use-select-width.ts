/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { SelectProps } from 'antd'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const sizeOptions = {
  normal: 150
}

export type SelectSize = number | keyof typeof sizeOptions

const toPixels = (size: SelectSize | undefined): number | undefined => {
  if (typeof size === 'number') {
    return size
  }

  if (typeof size === 'string' && size in sizeOptions) {
    return sizeOptions[size]
  }

  return undefined
}

/** An explicit `width` takes precedence over the field widths of the surrounding layout. */
export const useSelectWidth = (width: SelectSize | undefined, minWidth: SelectSize | undefined, mode: SelectProps['mode']): {
  computedWidth: number | undefined
  computedMinWidth: number | undefined
} => {
  const fieldWidths = useFieldWidthOptional()
  const explicitWidth = width === undefined ? undefined : toPixels(width)

  return {
    computedWidth: explicitWidth ?? (mode === 'multiple' ? fieldWidths?.large : fieldWidths?.medium),
    computedMinWidth: toPixels(minWidth)
  }
}

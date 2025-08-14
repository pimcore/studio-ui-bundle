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
import { TextArea as BaseTextArea, type ITextAreaProps } from '@Pimcore/components/textarea/textarea'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const TextArea = ({ style, ...props }: ITextAreaProps): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply large width as default for textareas
  const computedStyle = {
    width: fieldWidths.large,
    ...style
  }

  return <BaseTextArea style={computedStyle} {...props} />
}

export type { ITextAreaProps }

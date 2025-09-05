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
import { Wysiwyg, WysiwygContext, type WysiwygProps } from '@sdk/modules/wysiwyg'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { toCssDimension } from '@Pimcore/utils/css'

export interface WysiwygEditableProps extends WysiwygProps {
  inherited?: boolean
}

export const WysiwygEditable = ({
  inherited = false,
  context = WysiwygContext.DOCUMENT,
  value,
  onChange,
  width,
  ...wysiwygProps
}: WysiwygEditableProps): React.JSX.Element => {
  const handleOverwrite = (): void => {
    onChange?.(value ?? '')
  }

  return (
    <InheritanceOverlay
      display="block"
      isInherited={inherited}
      onOverwrite={handleOverwrite}
      style={{ maxWidth: toCssDimension(width) }}
    >
      <Wysiwyg
        {...wysiwygProps}
        context={context}
        value={value}
        onChange={onChange}
        width={width}
        disabled={inherited}
      />
    </InheritanceOverlay>
  )
}

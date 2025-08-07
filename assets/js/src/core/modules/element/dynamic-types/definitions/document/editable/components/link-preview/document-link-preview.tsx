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
import cn from 'classnames'
import { isEmpty, isNull } from 'lodash'
import type { LinkValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/link'
import { LinkPreview } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/link/components/link-preview/link-preview'

interface DocumentLinkPreviewProps {
  className?: string
  inherited?: boolean
  textPrefix?: string
  textSuffix?: string
  value: LinkValue | null
}

export const DocumentLinkPreview = ({ value, className, textPrefix, textSuffix, inherited }: DocumentLinkPreviewProps): React.JSX.Element => {
  if (isNull(value) || isEmpty(value.fullPath)) {
    return (
      <LinkPreview
        className={ className }
        inherited={ inherited }
        textPrefix={ textPrefix }
        textSuffix={ textSuffix }
        value={ value }
      />
    )
  }

  const linkText = isEmpty(value.text) ? value.fullPath : value.text

  return (
    <a
      className={ cn(className, value.class) }
      href={ value.fullPath }
    >
      {textPrefix}{linkText}{textSuffix}
    </a>
  )
}

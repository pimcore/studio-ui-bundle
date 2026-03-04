/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box } from '@sdk/components'
import React from 'react'

interface UrlLinkProps {
  value?: string
  text?: string
}

export const UrlLink = ({ value, text }: UrlLinkProps): React.JSX.Element | null => {
  if (value === undefined || value === '') {
    return null
  }

  return (
    <Box padding={ { x: 'mini' } }>
      <a
        href={ value }
        rel="noopener noreferrer"
        target="_blank"
      >
        {text ?? value}
      </a>
    </Box>
  )
}

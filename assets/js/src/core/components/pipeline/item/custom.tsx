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
import { Box } from '@Pimcore/components/box/box'

export interface PipelineItemCustomProps {
  children: React.ReactNode
  padded?: boolean
}

export const PipelineItemCustom = ({ children, padded = true }: PipelineItemCustomProps): React.JSX.Element => {
  return (
    <Box padding={ padded ? 'mini' : 'none' }>
      {children}
    </Box>
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useCssContainerStyles } from './use-css-container.styles'

export interface UseCssContainerProps {
  name: string
  type?: string
}

export interface UseCssContainerReturn {
  styleDefinition: ReturnType<typeof useCssContainerStyles>
}

export const useCssContainer = ({ name, type = 'size' }: UseCssContainerProps): UseCssContainerReturn => {
  const styleDefinition = useCssContainerStyles({ name, type })

  return useMemo(() => {
    return {
      styleDefinition
    }
  }, [])
}

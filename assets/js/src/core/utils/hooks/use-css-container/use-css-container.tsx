/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

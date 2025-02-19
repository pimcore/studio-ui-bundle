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

import type { ElementType } from '../../../../types/enums/element/element-type'
import { eventBus } from '@Pimcore/lib/event-bus'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export interface UseRefreshGridHookReturn {
  refreshGrid: (parentId?: number) => void
}

export const useRefreshGrid = (elementType: ElementType): UseRefreshGridHookReturn => {
  const elementContext = useOptionalElementContext()

  const refreshGrid = (parentId?: number): void => {
    const id = parentId ?? elementContext?.id

    if (elementType === 'asset' && id !== undefined) {
      eventBus.publish({ identifier: { type: 'asset:listing:refresh', id } })
    }
  }

  return {
    refreshGrid
  }
}

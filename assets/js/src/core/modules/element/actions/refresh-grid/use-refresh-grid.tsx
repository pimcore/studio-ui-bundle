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

import { eventBus } from '@Pimcore/lib/event-bus'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useContext } from 'react'
import type { ElementType } from '../../../../types/enums/element/element-type'
import { DataContext } from '../../listing/abstract/data-layer/provider/data/data-provider'

export interface UseRefreshGridHookReturn {
  refreshGrid: (parentId?: number) => Promise<void>
}

export const useRefreshGrid = (elementType: ElementType): UseRefreshGridHookReturn => {
  const elementContext = useOptionalElementContext()
  const dataContext = useContext(DataContext)

  const refreshGrid = async (parentId?: number): Promise<void> => {
    const id = parentId ?? elementContext?.id

    if (dataContext?.dataQueryResult !== undefined) {
      const { refetch } = dataContext.dataQueryResult
      await refetch()
    }

    if (elementType === 'asset' && id !== undefined) {
      eventBus.publish({ identifier: { type: 'asset:listing:refresh', id } })
    }
  }

  return {
    refreshGrid
  }
}

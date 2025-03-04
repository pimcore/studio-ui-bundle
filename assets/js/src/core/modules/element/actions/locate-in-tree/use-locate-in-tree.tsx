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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { api } from '@Pimcore/modules/element/element-api-slice.gen'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { isNil, isNull, isUndefined } from 'lodash'
import { locateInTree as locateInTreeAction, setNodeScrollTo, setSelectedNodeIds } from '@Pimcore/components/element-tree/element-tree-slice'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useRefreshTree } from '../refresh-tree/use-refresh-tree'

export interface UseLocateInTreeHookReturn {
  locateInTree: (elementId: number, onFinished?: () => void) => void
}

export const useLocateInTree = (elementType: ElementType): UseLocateInTreeHookReturn => {
  const dispatch = useAppDispatch()
  const activePerspective = selectActivePerspective(store.getState())
  const { switchToWidget } = useWidgetManager()
  const { refreshTree } = useRefreshTree(elementType)

  const locateInTree = (elementId: number, onFinished?: () => void): void => {
    if (isNull(activePerspective)) {
      return
    }

    dispatch(api.endpoints.elementGetTreeLocation.initiate({
      id: elementId,
      elementType,
      perspectiveId: activePerspective.id
    }, { forceRefetch: true }))
      .then((result) => {
        if (!isUndefined(result.error)) {
          trackError(new ApiError(result.error))
          return
        }

        if (!isNil(result.data) && !isNil(result.data.treeLevelData)) {
          switchToWidget(result.data.widgetId)
          result.data.treeLevelData.forEach((treeLevelDataItem) => {
            refreshTree(treeLevelDataItem.parentId ?? 1)
          })

          dispatch(locateInTreeAction({
            treeId: result.data.widgetId,
            treeLevelData: result.data.treeLevelData
          }))
          dispatch(setSelectedNodeIds({
            treeId: result.data.widgetId,
            selectedNodeIds: [String(elementId)]
          }))
          dispatch(setNodeScrollTo({
            treeId: result.data.widgetId,
            nodeId: String(elementId),
            scrollTo: true
          }))
          onFinished?.()
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    locateInTree
  }
}

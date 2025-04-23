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

import { store, useAppDispatch } from '@Pimcore/app/store'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { locateInTree as locateInTreeAction } from '@Pimcore/components/element-tree/element-tree-slice'
import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/element/element-api-slice.gen'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isNil, isNull } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContextMenuActionName } from '..'

export interface UseLocateInTreeHookReturn {
  locateInTree: (elementId: number, onFinished?: () => void) => void
  locateInTreeGridContextMenuItem: (row: any, onFinish?: () => void) => ItemType | undefined
}

export const useLocateInTree = (elementType: ElementType): UseLocateInTreeHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const activePerspective = selectActivePerspective(store.getState())
  const { switchToWidget } = useWidgetManager()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        if (!isNil(result.data) && !isNil(result.data.treeLevelData)) {
          const treeId = result.data.widgetId
          switchToWidget(treeId)

          dispatch(locateInTreeAction({
            treeId,
            nodeId: String(elementId),
            treeLevelData: result.data.treeLevelData
          }))
          onFinished?.()
        }
      })
      .catch(() => { trackError(new GeneralError('An error occured while locating in the tree')) })
  }

  const locateInTreeGridContextMenuItem = (row: any, onFinish?: () => void): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined) {
      return
    }

    return {
      label: t('element.locate-in-tree'),
      key: ContextMenuActionName.locateInTree,
      isLoading,
      icon: <Icon value={ 'target' } />,
      onClick: async () => {
        setIsLoading(true)
        locateInTree(data.id, () => {
          onFinish?.()
          setIsLoading(false)
        })
      }
    }
  }

  return {
    locateInTree,
    locateInTreeGridContextMenuItem
  }
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ApiGatewayEventType } from '../types/event-types'
import { store } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/element/element-api-slice.gen'
import { locateInTree as locateInTreeAction } from '@Pimcore/components/element-tree/element-tree-slice'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { setActiveWidgetById } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { isNull, isNil, isString } from 'lodash'

export const locateInTreeHandler: ApiGatewayHandler<ApiGatewayEventType.locateInTree> = (payload) => {
  const { id, elementType } = payload

  const activePerspective = selectActivePerspective(store.getState())

  if (isNull(activePerspective)) {
    console.warn('No active perspective available for locate in tree')
    return
  }

  store.dispatch(api.endpoints.elementGetTreeLocation.initiate({
    id,
    elementType,
    perspectiveId: activePerspective.id
  }, { forceRefetch: true }))
    .then((result: any) => {
      if (!isNil(result.data) && !isNil(result.data.treeLevelData)) {
        const treeId = String(result.data.widgetId)

        store.dispatch(setActiveWidgetById(treeId))

        store.dispatch(locateInTreeAction({
          treeId,
          nodeId: isString(id) ? id : String(id),
          treeLevelData: result.data.treeLevelData
        }))
      }
    })
    .catch((error: any) => {
      console.error('Error locating element in tree:', error)
    })
}

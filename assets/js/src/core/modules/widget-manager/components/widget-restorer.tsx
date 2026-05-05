/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, type PropsWithChildren } from 'react'
import { loadReduxState } from '../../../utils/redux-state-persistence'
import { type WidgetManagerTabConfig, updateInnerModel, closeWidget } from '../widget-manager-slice'
import { getWidgetManagerStorageKey } from '../widget-manager-persistence'
import { type WidgetRestorerRegistry } from '../services/widget-restorer-registry'
import { useAppDispatch } from '@sdk/app'
import { type IJsonModel, Model, type TabNode } from 'flexlayout-react'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isNil } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export const WidgetRestorer = ({ children }: PropsWithChildren): React.JSX.Element | null => {
  const dispatch = useAppDispatch()
  const user = useUser()

  useEffect(() => {
    const restore = async (): Promise<void> => {
      const widgetRestorerRegistry = container.get<WidgetRestorerRegistry>(serviceIds.widgetRestorerRegistry)
      const userId = user.id

      const savedModel = loadReduxState<IJsonModel>(getWidgetManagerStorageKey(userId))
      if (!isNil(savedModel)) {
        try {
          const model = Model.fromJson(savedModel)
          dispatch(updateInnerModel(savedModel))

          const promises: Array<Promise<void>> = []

          model.visitNodes((node) => {
            if (node.getType() === 'tab') {
              const config = (node as TabNode).toJson() as WidgetManagerTabConfig
              promises.push((async () => {
                const success = await widgetRestorerRegistry.restore(config, dispatch)
                if (!success && !isNil(config.id)) {
                  dispatch(closeWidget(config.id))
                }
              })())
            }
          })

          await Promise.all(promises)
        } catch (e) {
          console.warn('Failed to restore widget layout', e)
        }
      }
    }

    void restore()
  }, [user.id])

  return <>{children}</>
}

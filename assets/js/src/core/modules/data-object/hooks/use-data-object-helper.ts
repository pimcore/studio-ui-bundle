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

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { type IconProps } from '@Pimcore/components/icon/icon'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { type ElementTask } from '@Pimcore/modules/element/hooks/use-element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type ElementIcon } from 'src/sdk/main'
import { useDataObjectUpdateByIdMutation } from '../data-object-api-slice.gen'
import { type EditorContainerProps } from '../editor/editor-container'

interface OpenDataObjectWidgetProps {
  config: EditorContainerProps
}

interface UseDataObjectReturn {
  openDataObject: (props: OpenDataObjectWidgetProps) => void
  executeDataObjectTask: (id: number, task: ElementTask) => void
}

export const useDataObjectHelper = (): UseDataObjectReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()
  const [update] = useDataObjectUpdateByIdMutation()

  async function openDataObject (props: OpenDataObjectWidgetProps): Promise<void> {
    const { config } = props
    const widgetId = getWidgetId('data-object', config.id)

    if (!isMainWidgetOpen(widgetId)) {
      dispatch(api.util.invalidateTags(invalidatingTags.DATA_OBJECT_DETAIL_ID(config.id)))
    }

    const { data } = await store.dispatch(api.endpoints.dataObjectGetById.initiate({ id: config.id }))

    if (
      data === undefined ||
      !checkElementPermission(data.permissions, 'view')) {
      return
    }

    const icon = getElementIcon(data, { value: 'widget', type: 'name' })
    const iconConfig: IconProps & ElementIcon = {
      type: icon.type,
      value: icon.value
    }

    openMainWidget({
      name: data?.key,
      id: widgetId,
      component: 'data-object-editor',
      config: {
        ...config,
        icon: iconConfig
      }
    })
  }

  const executeDataObjectTask = async (id: number, task: ElementTask): Promise<void> => {
    const updateTask = update({
      id,
      body: {
        data: {
          task
        }
      }
    })

    updateTask.catch((error: Error) => {
      trackError(new ApiError(error))
    })

    try {
      const response = (await updateTask)

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }
    } catch (e: any) {
      trackError(new GeneralError(e.message as string))
    }
  }

  return { openDataObject, executeDataObjectTask }
}

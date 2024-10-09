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

import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type EditorContainerProps } from '../editor/editor-container'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

interface OpenDataObjectWidgetProps {
  config: EditorContainerProps
}

interface UseDataObjectReturn {
  openDataObject: (props: OpenDataObjectWidgetProps) => void
}

export const useDataObjectHelper = (): UseDataObjectReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()

  async function openDataObject (props: OpenDataObjectWidgetProps): Promise<void> {
    const { config } = props
    const widgetId = `data-object-${config.id}`

    if (!isMainWidgetOpen(widgetId)) {
      dispatch(api.util.invalidateTags(invalidatingTags.DATA_OBJECT_DETAIL_ID(config.id)))
    }

    const dataObject = await store.dispatch(api.endpoints.dataObjectGetById.initiate({ id: config.id }))

    if (dataObject.data?.icon?.type === 'path') {
    //  return
    }

    openMainWidget({
      name: dataObject.data?.key,
      // icon: dataObject.data?.icon?.value,
      id: widgetId,
      component: 'data-object-editor',
      config
    })
  }

  return { openDataObject }
}

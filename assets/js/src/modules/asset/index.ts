import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import '@Pimcore/modules/asset/editor'
import { TreeContainer } from './tree/tree-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'

const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

widgetRegistryService.registerWidget({
  name: 'asset-tree',
  component: TreeContainer
})

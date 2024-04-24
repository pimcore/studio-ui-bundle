import { type WidgetRegistry, serviceName } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import '@Pimcore/modules/asset/editor'
import { TreeContainer } from './tree/tree-container'
import { container } from '@Pimcore/app/depency-injection'

const widgetRegistryService = container.get<WidgetRegistry>(serviceName)

widgetRegistryService.registerWidget({
  name: 'asset-tree',
  component: TreeContainer
})

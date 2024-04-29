import { container } from '@Pimcore/app/depency-injection'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { Example } from './containers/example'
import { WidgetManagerActions } from './containers/widget-manager-actions'
import { serviceIds } from '@Pimcore/app/config/services'

const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

widgetRegistryService.registerWidget({
  name: 'example',
  component: Example
})

widgetRegistryService.registerWidget({
  name: 'widget-manager-actions',
  component: WidgetManagerActions
})

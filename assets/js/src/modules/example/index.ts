import { container } from '@Pimcore/app/depency-injection'
import { type WidgetRegistry, serviceName } from '../widget-manager/utils/widget-registry'
import { Example } from './containers/example'
import { WidgetManagerActions } from './containers/widget-manager-actions'

const widgetRegistryService = container.get<WidgetRegistry>(serviceName)

widgetRegistryService.registerWidget({
  name: 'example',
  component: Example
})

widgetRegistryService.registerWidget({
  name: 'widget-manager-actions',
  component: WidgetManagerActions
})

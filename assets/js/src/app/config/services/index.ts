import { container } from '@Pimcore/app/depency-injection'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'

export const serviceIds = {
  widgetManagerService: Symbol('widgetManagerService')
}

container.bind(serviceIds.widgetManagerService).to(WidgetRegistry).inSingletonScope()

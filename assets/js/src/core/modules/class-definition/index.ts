import { moduleSystem } from "@Pimcore/app/module-system/module-system";
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { ClassDefinitionWidget } from "@Pimcore/modules/class-definition/class-definition-widget";

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    
    mainNavRegistryService.registerMainNavItem({
      // @todo check path
      path: 'ClassDefinitions',
      label: 'navigation.class-definitions',
      order: 100,
      widgetConfig: {
        name: 'class-definitions',
        id: 'class-definitions',
        component: 'class-definitions',
        config: {}
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'class-definitions',
      component: ClassDefinitionWidget
    })
  }
})

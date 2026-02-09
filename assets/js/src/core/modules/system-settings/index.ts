import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { WidgetRegistry } from "../widget-manager/services/widget-registry"
import { MainNavRegistry } from "../app/base-layout/main-nav/services/main-nav-registry"
import { SystemSettingsContainer } from "./system-settings-container"

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'system-settings',
      component: SystemSettingsContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'System/System Settings',
      label: 'navigation.systemSettings',
      className: 'item-style-modifier',
      order: 600,
      //permission: UserPermission.Translations,
      //perspectivePermission: NavPermission.Translations,
      widgetConfig: {
        name: 'system-settings',
        id: 'system-settings',
        component: 'system-settings',
        config: {
          translationKey: 'widget.system-settings',
          icon: {
            type: 'name',
            value: 'translate'
          }
        }
      }
    })
  }
})
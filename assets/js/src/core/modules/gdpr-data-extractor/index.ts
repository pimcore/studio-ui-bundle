import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { WidgetRegistry } from "@sdk/modules/widget-manager"
import { GDPRDataExtractorContainer } from "./gdpr-data-extractor-container"
import { MainNavRegistry } from "../app/base-layout/main-nav/services/main-nav-registry"

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'gdpr-data-extractor',
      component: GDPRDataExtractorContainer
    })

    //TODO: entry has to be on position 5. Double check the others
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/GDPR Extractor',
      label: 'navigation.gdpr-extractor',
      order: 500,
      className: 'item-style-modifier',
      //permission: UserPermission.Emails,
      //perspectivePermission: NavPermission.Mails,
      widgetConfig: {
        name: 'gdpr-extractor',
        id: 'gdpr-extractor',
        component: 'gdpr-data-extractor',
        config: {
          translationKey: 'widget.gdpr-extractor',
          icon: {
            type: 'name',
            value: 'lock-circle'
          }
        }
      }
    })
  }
})
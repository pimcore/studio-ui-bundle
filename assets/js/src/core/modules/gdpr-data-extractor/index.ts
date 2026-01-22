import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { WidgetRegistry } from "@sdk/modules/widget-manager"
import { GDPRDataExtractorContainer } from "./gdpr-data-extractor-container"
import { MainNavRegistry } from "../app/base-layout/main-nav/services/main-nav-registry"
import { DynamicTypeGDPRProviderRegistry } from "./dynamic-types/registry/dynamic-type-gdpr-provider-registry"
import { DynamicTypeDataObjectGDPRProvider } from "./dynamic-types/definitions/dynamic-type-data-object-gdpr-provider"
import { DynamicTypeAssetsGDPRProvider } from "./dynamic-types/definitions/dynamic-type-assets-gdpr-provider"
import { DynamicTypeUsersGDPRProvider } from "./dynamic-types/definitions/dynamic-type-users-gdpr-provider"
import { UserPermission } from "../auth/enums/user-permission"
import { NavPermission } from "../perspectives/enums/nav-permission"

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'gdpr-data-extractor',
      component: GDPRDataExtractorContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/GDPR Extractor',
      label: 'navigation.gdpr-extractor',
      order: 500,
      className: 'item-style-modifier',
      permission: UserPermission.GDPRDataExtractor,
      perspectivePermission: NavPermission.GDPRDataExtractor,
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

    const gdprProviderRegistry = container.get<DynamicTypeGDPRProviderRegistry>(serviceIds['DynamicTypes/GDPRProviderRegistry'])
    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeDataObjectGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/DataObjects'])
    )

    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeAssetsGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/Assets'])
    )

    gdprProviderRegistry.registerDynamicType(
      container.get<DynamicTypeUsersGDPRProvider>(serviceIds['DynamicTypes/GDPRProvider/Users'])
    )
  }
})
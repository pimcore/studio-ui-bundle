import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { WidgetRegistry } from '../widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { RecycleBinContainer } from './recycle-bin-container'
import { MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'recycle-bin',
      component: RecycleBinContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Tools/Recycle Bin',
      label: 'navigation.recycle-bin',
      permission: UserPermission.RecycleBin,
      perspectivePermission: NavPermission.RecycleBin,
      widgetConfig: {
        name: 'recycleBin',
        id: 'recycle-bin',
        component: 'recycle-bin',
        config: {
          translationKey: 'widget.recycle-bin',
          icon: {
            type: 'name',
            value: 'trash'
          }
        }
      }
    })
  }
})
import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { MainNavRegistry } from "../app/base-layout/main-nav/services/main-nav-registry"
import { UserPermission } from "../auth/enums/user-permission"
import { NavPermission } from "../perspectives/enums/nav-permission"
import { WidgetRegistry } from "../widget-manager/services/widget-registry"
import { CustomViewEditor } from "./custom-view-editor/custom-view-editor"
import { PerspectiveEditorContainer } from "./perspective-editor/perspective-editor-container"

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'perspective-editor',
      component: PerspectiveEditorContainer
    })

    widgetRegistryService.registerWidget({
      name: 'custom-view-editor',
      component: CustomViewEditor
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Widget Editor',
      label: 'navigation.widget-editor',
      order: 500
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Widget Editor/Perspective-Editor',
      label: 'navigation.widget-editor.perspective-editor',
      order: 100,
      className: 'item-style-modifier',
      //permission: UserPermission.FOO,
      //perspectivePermission: NavPermission.BAR,
      widgetConfig: {
        name: 'perspectiveEditor',
        id: 'perspective-editor',
        component: 'perspective-editor',
        config: {
          translationKey: 'widget.widget-editor.perspective-editor',
          icon: {
            type: 'name',
            value: 'book-open-01'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Widget Editor/Custom-View-Editor',
      label: 'navigation.widget-editor.custom-view-editor',
      order: 200,
      className: 'item-style-modifier',
      //permission: UserPermission.FOO,
      //perspectivePermission: NavPermission.BAR,
      widgetConfig: {
        name: 'customViewEditor',
        id: 'custom-view-editor',
        component: 'custom-view-editor',
        config: {
          translationKey: 'widget.widget-editor.custom-view-editor',
          icon: {
            type: 'name',
            value: 'layout-grid-02'
          }
        }
      }
    })

    console.log(mainNavRegistryService.getMainNavItems())
  }
})

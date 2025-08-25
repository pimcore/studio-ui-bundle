import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { MainNavRegistry } from "../app/base-layout/main-nav/services/main-nav-registry"
import { WidgetRegistry } from "../widget-manager/services/widget-registry"
import { WidgetEditorContainerInner } from "./custom-view-editor/widget-editor-container-inner"
import { PerspectiveEditorContainer } from "./perspective-editor/perspective-editor-container"

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'perspective-editor',
      component: PerspectiveEditorContainer
    })

    widgetRegistryService.registerWidget({
      name: 'widget-editor',
      component: WidgetEditorContainerInner
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
      path: 'System/Widget Editor/Widget-Editor',
      label: 'navigation.widget-editor.widget-editor',
      order: 200,
      className: 'item-style-modifier',
      //permission: UserPermission.FOO,
      //perspectivePermission: NavPermission.BAR,
      widgetConfig: {
        name: 'widgetEditor',
        id: 'widget-editor',
        component: 'widget-editor',
        config: {
          translationKey: 'widget.widget-editor.widget-editor',
          icon: {
            type: 'name',
            value: 'layout-grid-02'
          }
        }
      }
    })
  }
})

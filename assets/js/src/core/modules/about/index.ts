import { serviceIds } from "@Pimcore/app/config/services/service-ids"
import { container } from "@Pimcore/app/depency-injection"
import { moduleSystem } from "@Pimcore/app/module-system/module-system"
import { MainNavRegistry } from "@sdk/modules/app"
import React from "react"
import { AboutDialogContainer } from "./components/about-dialog/about-dialog-container"

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/About',
      label: 'navigation.about',
      className: 'item-style-modifier',
      order: 9999,
      button: () => React.createElement(AboutDialogContainer, {})
    })
  }
})
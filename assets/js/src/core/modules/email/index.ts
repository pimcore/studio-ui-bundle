import { moduleSystem } from "@Pimcore/app/module-system/module-system";
import { WidgetRegistry } from "../widget-manager/services/widget-registry";
import { container } from "@Pimcore/app/depency-injection";
import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { EmailBlocklistContainer } from "./blocklist/email-blocklist-container";

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'email-blocklist',
      component: EmailBlocklistContainer
    })
  }
})
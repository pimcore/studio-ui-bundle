/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { ImageThumbnailsContainer } from './image-thumbnails-container'
import { NavPermission } from '../perspectives/enums/nav-permission'

export const IMAGE_THUMBNAILS_WIDGET: WidgetManagerTabConfig = {
  name: 'Image Thumbnails',
  id: 'image-thumbnails',
  component: 'image-thumbnails',
  config: {
    translationKey: 'widget.image-thumbnails',
    icon: {
      type: 'name',
      value: 'image-thumbnail-clear'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'AssetManagement/Image Thumbnails',
      label: 'navigation.image-thumbnails',
      className: 'item-style-modifier',
      order: 100,
      permission: UserPermission.Thumbnails,
      perspectivePermission: NavPermission.AssetThumbnails,
      widgetConfig: IMAGE_THUMBNAILS_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'image-thumbnails',
      component: ImageThumbnailsContainer
    })
  }
})

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
import { VideoThumbnailsContainer } from './video-thumbnails-container'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { type VideoTransformationDynamicTypeRegistry } from './dynamic-types/video-transformation-dynamic-type-registry'
import { type ResizeVideoTransformationType } from './dynamic-types/resize/resize-transformation-type'
import { type ScaleByWidthVideoTransformationType } from './dynamic-types/scale-by-width/scale-by-width-transformation-type'
import { type ScaleByHeightVideoTransformationType } from './dynamic-types/scale-by-height/scale-by-height-transformation-type'
import { type CutVideoTransformationType } from './dynamic-types/cut/cut-transformation-type'
import { type SetFramerateVideoTransformationType } from './dynamic-types/set-framerate/set-framerate-transformation-type'
import { type ColorChannelMixerVideoTransformationType } from './dynamic-types/color-channel-mixer/color-channel-mixer-transformation-type'
import { type MuteVideoTransformationType } from './dynamic-types/mute/mute-transformation-type'

export const VIDEO_THUMBNAILS_WIDGET: WidgetManagerTabConfig = {
  name: 'Video Thumbnails',
  id: 'video-thumbnails',
  component: 'video-thumbnails',
  config: {
    translationKey: 'widget.video-thumbnails',
    icon: {
      type: 'name',
      value: 'video-thumbnail'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'AssetManagement/Video Thumbnails',
      label: 'navigation.video-thumbnails',
      className: 'item-style-modifier',
      order: 101,
      permission: UserPermission.Thumbnails,
      perspectivePermission: NavPermission.AssetThumbnails,
      widgetConfig: VIDEO_THUMBNAILS_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'video-thumbnails',
      component: VideoThumbnailsContainer
    })

    const transformationRegistry = container.get<VideoTransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry'])

    transformationRegistry.registerDynamicType(container.get<ResizeVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/Resize']))
    transformationRegistry.registerDynamicType(container.get<ScaleByWidthVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/ScaleByWidth']))
    transformationRegistry.registerDynamicType(container.get<ScaleByHeightVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/ScaleByHeight']))
    transformationRegistry.registerDynamicType(container.get<CutVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/Cut']))
    transformationRegistry.registerDynamicType(container.get<SetFramerateVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/SetFramerate']))
    transformationRegistry.registerDynamicType(container.get<ColorChannelMixerVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/ColorChannelMixer']))
    transformationRegistry.registerDynamicType(container.get<MuteVideoTransformationType>(serviceIds['DynamicTypes/VideoTransformation/Mute']))
  }
})

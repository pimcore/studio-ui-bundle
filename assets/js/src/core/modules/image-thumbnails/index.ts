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
import { type TransformationDynamicTypeRegistry } from './dynamic-types/transformation-dynamic-type-registry'
import { type CoverTransformationType } from './dynamic-types/cover/cover-transformation-type'
import { type ResizeTransformationType } from './dynamic-types/resize/resize-transformation-type'
import { type ScaleByWidthTransformationType } from './dynamic-types/scale-by-width/scale-by-width-transformation-type'
import { type ScaleByHeightTransformationType } from './dynamic-types/scale-by-height/scale-by-height-transformation-type'
import { type TrimTransformationType } from './dynamic-types/trim/trim-transformation-type'
import { type SepiaTransformationType } from './dynamic-types/sepia/sepia-transformation-type'
import { type GrayscaleTransformationType } from './dynamic-types/grayscale/grayscale-transformation-type'
import { type SharpenTransformationType } from './dynamic-types/sharpen/sharpen-transformation-type'
import { type ContainTransformationType } from './dynamic-types/contain/contain-transformation-type'
import { type CropTransformationType } from './dynamic-types/crop/crop-transformation-type'
import { type FrameTransformationType } from './dynamic-types/frame/frame-transformation-type'
import { type RotateTransformationType } from './dynamic-types/rotate/rotate-transformation-type'
import { type MirrorTransformationType } from './dynamic-types/mirror/mirror-transformation-type'
import { type GaussianBlurTransformationType } from './dynamic-types/gaussian-blur/gaussian-blur-transformation-type'
import { type BrightnessSaturationTransformationType } from './dynamic-types/brightness-saturation/brightness-saturation-transformation-type'
import { type SetBackgroundColorTransformationType } from './dynamic-types/set-background-color/set-background-color-transformation-type'
import { type SetBackgroundImageTransformationType } from './dynamic-types/set-background-image/set-background-image-transformation-type'
import { type RoundCornersTransformationType } from './dynamic-types/round-corners/round-corners-transformation-type'
import { type AddOverlayTransformationType } from './dynamic-types/add-overlay/add-overlay-transformation-type'
import { type AddOverlayFitTransformationType } from './dynamic-types/add-overlay-fit/add-overlay-fit-transformation-type'
import { type ApplyMaskTransformationType } from './dynamic-types/apply-mask/apply-mask-transformation-type'
import { type TiffOriginalTransformationType } from './dynamic-types/tiff-original/tiff-original-transformation-type'
import { type OnePixelTransformationType } from './dynamic-types/one-pixel/one-pixel-transformation-type'

export const IMAGE_THUMBNAILS_WIDGET: WidgetManagerTabConfig = {
  name: 'Image Thumbnails',
  id: 'image-thumbnails',
  component: 'image-thumbnails',
  config: {
    translationKey: 'widget.image-thumbnails',
    icon: {
      type: 'name',
      value: 'image-thumbnail'
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

    const transformationRegistry = container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry'])

    transformationRegistry.registerDynamicType(container.get<CoverTransformationType>(serviceIds['DynamicTypes/Transformation/Cover']))
    transformationRegistry.registerDynamicType(container.get<ResizeTransformationType>(serviceIds['DynamicTypes/Transformation/Resize']))
    transformationRegistry.registerDynamicType(container.get<ScaleByWidthTransformationType>(serviceIds['DynamicTypes/Transformation/ScaleByWidth']))
    transformationRegistry.registerDynamicType(container.get<ScaleByHeightTransformationType>(serviceIds['DynamicTypes/Transformation/ScaleByHeight']))
    transformationRegistry.registerDynamicType(container.get<TrimTransformationType>(serviceIds['DynamicTypes/Transformation/Trim']))
    transformationRegistry.registerDynamicType(container.get<SepiaTransformationType>(serviceIds['DynamicTypes/Transformation/Sepia']))
    transformationRegistry.registerDynamicType(container.get<GrayscaleTransformationType>(serviceIds['DynamicTypes/Transformation/Grayscale']))
    transformationRegistry.registerDynamicType(container.get<SharpenTransformationType>(serviceIds['DynamicTypes/Transformation/Sharpen']))
    transformationRegistry.registerDynamicType(container.get<ContainTransformationType>(serviceIds['DynamicTypes/Transformation/Contain']))
    transformationRegistry.registerDynamicType(container.get<CropTransformationType>(serviceIds['DynamicTypes/Transformation/Crop']))
    transformationRegistry.registerDynamicType(container.get<FrameTransformationType>(serviceIds['DynamicTypes/Transformation/Frame']))
    transformationRegistry.registerDynamicType(container.get<RotateTransformationType>(serviceIds['DynamicTypes/Transformation/Rotate']))
    transformationRegistry.registerDynamicType(container.get<MirrorTransformationType>(serviceIds['DynamicTypes/Transformation/Mirror']))
    transformationRegistry.registerDynamicType(container.get<GaussianBlurTransformationType>(serviceIds['DynamicTypes/Transformation/GaussianBlur']))
    transformationRegistry.registerDynamicType(container.get<BrightnessSaturationTransformationType>(serviceIds['DynamicTypes/Transformation/BrightnessSaturation']))
    transformationRegistry.registerDynamicType(container.get<SetBackgroundColorTransformationType>(serviceIds['DynamicTypes/Transformation/SetBackgroundColor']))
    transformationRegistry.registerDynamicType(container.get<SetBackgroundImageTransformationType>(serviceIds['DynamicTypes/Transformation/SetBackgroundImage']))
    transformationRegistry.registerDynamicType(container.get<RoundCornersTransformationType>(serviceIds['DynamicTypes/Transformation/RoundCorners']))
    transformationRegistry.registerDynamicType(container.get<AddOverlayTransformationType>(serviceIds['DynamicTypes/Transformation/AddOverlay']))
    transformationRegistry.registerDynamicType(container.get<AddOverlayFitTransformationType>(serviceIds['DynamicTypes/Transformation/AddOverlayFit']))
    transformationRegistry.registerDynamicType(container.get<ApplyMaskTransformationType>(serviceIds['DynamicTypes/Transformation/ApplyMask']))
    transformationRegistry.registerDynamicType(container.get<TiffOriginalTransformationType>(serviceIds['DynamicTypes/Transformation/TiffOriginal']))
    transformationRegistry.registerDynamicType(container.get<OnePixelTransformationType>(serviceIds['DynamicTypes/Transformation/OnePixel']))
  }
})

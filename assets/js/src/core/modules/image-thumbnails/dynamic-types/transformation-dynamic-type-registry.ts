/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type TransformationDynamicTypeAbstract } from './transformation-dynamic-type-abstract'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { TransformationFieldCollectionRegistry } from '../registries/transformation-field-collection-registry'

import { ResizeTransformationType } from './resize/resize-transformation-type'
import { ScaleByHeightTransformationType } from './scale-by-height/scale-by-height-transformation-type'
import { TrimTransformationType } from './trim/trim-transformation-type'
import { CoverTransformationType } from './cover/cover-transformation-type'
import { ScaleByWidthTransformationType } from './scale-by-width/scale-by-width-transformation-type'
import { SepiaTransformationType } from './sepia/sepia-transformation-type'
import { GrayscaleTransformationType } from './grayscale/grayscale-transformation-type'
import { SharpenTransformationType } from './sharpen/sharpen-transformation-type'
import { ContainTransformationType } from './contain/contain-transformation-type'
import { CropTransformationType } from './crop/crop-transformation-type'
import { FrameTransformationType } from './frame/frame-transformation-type'
import { RotateTransformationType } from './rotate/rotate-transformation-type'
import { MirrorTransformationType } from './mirror/mirror-transformation-type'
import { GaussianBlurTransformationType } from './gaussian-blur/gaussian-blur-transformation-type'
import { BrightnessSaturationTransformationType } from './brightness-saturation/brightness-saturation-transformation-type'
import { SetBackgroundColorTransformationType } from './set-background-color/set-background-color-transformation-type'
import { SetBackgroundImageTransformationType } from './set-background-image/set-background-image-transformation-type'
import { RoundCornersTransformationType } from './round-corners/round-corners-transformation-type'
import { AddOverlayTransformationType } from './add-overlay/add-overlay-transformation-type'
import { AddOverlayFitTransformationType } from './add-overlay-fit/add-overlay-fit-transformation-type'
import { ApplyMaskTransformationType } from './apply-mask/apply-mask-transformation-type'
import { TiffOriginalTransformationType } from './tiff-original/tiff-original-transformation-type'
import { OnePixelTransformationType } from './one-pixel/one-pixel-transformation-type'

@injectable()
export class TransformationDynamicTypeRegistry extends DynamicTypeRegistryAbstract<TransformationDynamicTypeAbstract> {
  public static readonly SERVICE_ID = 'image-thumbnails.transformation-dynamic-type-registry'

  registerDynamicType (type: TransformationDynamicTypeAbstract): void {
    super.registerDynamicType(type)
  }

  overrideDynamicType (type: TransformationDynamicTypeAbstract): void {
    super.overrideDynamicType(type)
  }

  getToolStripBox (transformationType: string): React.ComponentType<any> | null {
    // Return null to use the default fallback component
    // This can be extended later to return type-specific toolstrip components
    return null
  }
}

export const transformationDynamicTypeRegistry = new TransformationDynamicTypeRegistry()

export const transformationFieldCollectionRegistry = new TransformationFieldCollectionRegistry(transformationDynamicTypeRegistry)

let isRegistered = false

export function initializeTransformationTypes (): void {
  if (isRegistered) return

  try {
    transformationDynamicTypeRegistry.registerDynamicType(new CoverTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new ResizeTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new ScaleByWidthTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new ScaleByHeightTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new TrimTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new SepiaTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new GrayscaleTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new SharpenTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new ContainTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new CropTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new FrameTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new RotateTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new MirrorTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new GaussianBlurTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new BrightnessSaturationTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new SetBackgroundColorTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new SetBackgroundImageTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new RoundCornersTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new AddOverlayTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new AddOverlayFitTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new ApplyMaskTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new TiffOriginalTransformationType())
    transformationDynamicTypeRegistry.registerDynamicType(new OnePixelTransformationType())

    isRegistered = true
  } catch (error) {
    trackError(new GeneralError(`Error during transformation types initialization: ${error}`))
  }
}

initializeTransformationTypes()

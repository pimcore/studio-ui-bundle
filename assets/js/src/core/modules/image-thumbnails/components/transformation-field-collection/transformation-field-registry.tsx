/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import React from 'react'
import { FieldCollectionRegistry } from '@Pimcore/components/form/controls/field-collection/field-collection-registry'

import { ResizeTransformationField } from './fields/resize-transformation-field/resize-transformation-field'
import { CropTransformationField } from './fields/crop-transformation-field/crop-transformation-field'
import { CoverTransformationField } from './fields/cover-transformation-field/cover-transformation-field'
import { ContainTransformationField } from './fields/contain-transformation-field/contain-transformation-field'
import { ScaleByWidthTransformationField } from './fields/scale-by-width-transformation-field/scale-by-width-transformation-field'
import { ScaleByHeightTransformationField } from './fields/scale-by-height-transformation-field/scale-by-height-transformation-field'
import { FrameTransformationField } from './fields/frame-transformation-field/frame-transformation-field'
import { RotateTransformationField } from './fields/rotate-transformation-field/rotate-transformation-field'
import { MirrorTransformationField } from './fields/mirror-transformation-field/mirror-transformation-field'
import { TrimTransformationField } from './fields/trim-transformation-field/trim-transformation-field'
import { GrayscaleTransformationField } from './fields/grayscale-transformation-field/grayscale-transformation-field'
import { SepiaTransformationField } from './fields/sepia-transformation-field/sepia-transformation-field'
import { BrightnessSaturationTransformationField } from './fields/brightness-saturation-transformation-field/brightness-saturation-transformation-field'
import { GaussianBlurTransformationField } from './fields/gaussian-blur-transformation-field/gaussian-blur-transformation-field'
import { SharpenTransformationField } from './fields/sharpen-transformation-field/sharpen-transformation-field'
import { RoundCornersTransformationField } from './fields/round-corners-transformation-field/round-corners-transformation-field'
import { SetBackgroundColorTransformationField } from './fields/set-background-color-transformation-field/set-background-color-transformation-field'
import { SetBackgroundImageTransformationField } from './fields/set-background-image-transformation-field/set-background-image-transformation-field'
import { AddOverlayTransformationField } from './fields/add-overlay-transformation-field/add-overlay-transformation-field'
import { AddOverlayFitTransformationField } from './fields/add-overlay-fit-transformation-field/add-overlay-fit-transformation-field'
import { ApplyMaskTransformationField } from './fields/apply-mask-transformation-field/apply-mask-transformation-field'
import { PixelTransformationField } from './fields/pixel-transformation-field/pixel-transformation-field'
import { TiffOriginalTransformationField } from './fields/tiff-original-transformation-field/tiff-original-transformation-field'

export interface TransformationFieldItem {
  type: string
  data: Record<string, any>
}

/**
 * Registry for image transformation field collection components
 * Maps transformation types to their corresponding field collection components
 */
export class TransformationFieldRegistry extends FieldCollectionRegistry {
  constructor() {
    super()
    this.registerAllTransformationFields()
  }

  private registerAllTransformationFields(): void {
    // Basic Size Transformations
    this.register({
      type: 'resize',
      key: 'resize-transformation',
      translationKey: 'image-thumbnails.transformations.resize',
      component: <ResizeTransformationField />
    })

    this.register({
      type: 'crop',
      key: 'crop-transformation',
      translationKey: 'image-thumbnails.transformations.crop',
      component: <CropTransformationField />
    })

    this.register({
      type: 'cover',
      key: 'cover-transformation',
      translationKey: 'image-thumbnails.transformations.cover',
      component: <CoverTransformationField />
    })

    this.register({
      type: 'contain',
      key: 'contain-transformation',
      translationKey: 'image-thumbnails.transformations.contain',
      component: <ContainTransformationField />
    })

    this.register({
      type: 'scaleByWidth',
      key: 'scale-by-width-transformation',
      translationKey: 'image-thumbnails.transformations.scaleByWidth',
      component: <ScaleByWidthTransformationField />
    })

    this.register({
      type: 'scaleByHeight',
      key: 'scale-by-height-transformation',
      translationKey: 'image-thumbnails.transformations.scaleByHeight',
      component: <ScaleByHeightTransformationField />
    })

    this.register({
      type: 'frame',
      key: 'frame-transformation',
      translationKey: 'image-thumbnails.transformations.frame',
      component: <FrameTransformationField />
    })

    // Geometric Transformations
    this.register({
      type: 'rotate',
      key: 'rotate-transformation',
      translationKey: 'image-thumbnails.transformations.rotate',
      component: <RotateTransformationField />
    })

    this.register({
      type: 'mirror',
      key: 'mirror-transformation',
      translationKey: 'image-thumbnails.transformations.mirror',
      component: <MirrorTransformationField />
    })

    this.register({
      type: 'trim',
      key: 'trim-transformation',
      translationKey: 'image-thumbnails.transformations.trim',
      component: <TrimTransformationField />
    })

    // Color & Effects Transformations
    this.register({
      type: 'grayscale',
      key: 'grayscale-transformation',
      translationKey: 'image-thumbnails.transformations.grayscale',
      component: <GrayscaleTransformationField />
    })

    this.register({
      type: 'sepia',
      key: 'sepia-transformation',
      translationKey: 'image-thumbnails.transformations.sepia',
      component: <SepiaTransformationField />
    })

    this.register({
      type: 'brightnessSaturation',
      key: 'brightness-saturation-transformation',
      translationKey: 'image-thumbnails.transformations.brightnessSaturation',
      component: <BrightnessSaturationTransformationField />
    })

    // Filter Transformations
    this.register({
      type: 'gaussianBlur',
      key: 'gaussian-blur-transformation',
      translationKey: 'image-thumbnails.transformations.gaussianBlur',
      component: <GaussianBlurTransformationField />
    })

    this.register({
      type: 'sharpen',
      key: 'sharpen-transformation',
      translationKey: 'image-thumbnails.transformations.sharpen',
      component: <SharpenTransformationField />
    })

    this.register({
      type: 'roundCorners',
      key: 'round-corners-transformation',
      translationKey: 'image-thumbnails.transformations.roundCorners',
      component: <RoundCornersTransformationField />
    })

    // Background Transformations
    this.register({
      type: 'setBackgroundColor',
      key: 'set-background-color-transformation',
      translationKey: 'image-thumbnails.transformations.setBackgroundColor',
      component: <SetBackgroundColorTransformationField />
    })

    this.register({
      type: 'setBackgroundImage',
      key: 'set-background-image-transformation',
      translationKey: 'image-thumbnails.transformations.setBackgroundImage',
      component: <SetBackgroundImageTransformationField />
    })

    // Overlay Transformations
    this.register({
      type: 'addOverlay',
      key: 'add-overlay-transformation',
      translationKey: 'image-thumbnails.transformations.addOverlay',
      component: <AddOverlayTransformationField />
    })

    this.register({
      type: 'addOverlayFit',
      key: 'add-overlay-fit-transformation',
      translationKey: 'image-thumbnails.transformations.addOverlayFit',
      component: <AddOverlayFitTransformationField />
    })

    this.register({
      type: 'applyMask',
      key: 'apply-mask-transformation',
      translationKey: 'image-thumbnails.transformations.applyMask',
      component: <ApplyMaskTransformationField />
    })

    // Special Transformations
    this.register({
      type: '1x1_pixel',
      key: 'pixel-transformation',
      translationKey: 'image-thumbnails.transformations.1x1_pixel',
      component: <PixelTransformationField />
    })

    this.register({
      type: 'tifforiginal',
      key: 'tiff-original-transformation',
      translationKey: 'image-thumbnails.transformations.tifforiginal',
      component: <TiffOriginalTransformationField />
    })
  }
}

/**
 * Singleton instance of the transformation field registry
 */
export const transformationFieldRegistry = new TransformationFieldRegistry()
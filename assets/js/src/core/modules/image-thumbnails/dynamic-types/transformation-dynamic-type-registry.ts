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

import type { TransformationDynamicTypeInterface } from './transformation-dynamic-type-interface'
import { createTransformationToolStripBox, type BaseTransformationToolStripBoxProps } from '../components/transformation-toolstrip-boxes/transformation-toolstrip-box-abstract'
import React from 'react'


class TransformationDynamicTypeRegistry {
  private readonly types = new Map<string, TransformationDynamicTypeInterface>()
  private readonly toolstripBoxes = new Map<string, React.ComponentType<BaseTransformationToolStripBoxProps>>()

  register(type: TransformationDynamicTypeInterface): void {
    this.types.set(type.getName(), type)
    this.toolstripBoxes.set(type.getName(), createTransformationToolStripBox(type))
  }

  get(name: string): TransformationDynamicTypeInterface | undefined {
    return this.types.get(name)
  }

  getToolStripBox(name: string): React.ComponentType<BaseTransformationToolStripBoxProps> | undefined {
    return this.toolstripBoxes.get(name)
  }

  getAll(): TransformationDynamicTypeInterface[] {
    return Array.from(this.types.values())
  }
}

export const transformationDynamicTypeRegistry = new TransformationDynamicTypeRegistry()

let isRegistered = false

// Synchronous imports for immediate registration
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

export function initializeTransformationTypes(): void {
  if (isRegistered) return
  
  try {
    transformationDynamicTypeRegistry.register(new CoverTransformationType())
    transformationDynamicTypeRegistry.register(new ResizeTransformationType())
    transformationDynamicTypeRegistry.register(new ScaleByWidthTransformationType())
    transformationDynamicTypeRegistry.register(new ScaleByHeightTransformationType())
    transformationDynamicTypeRegistry.register(new TrimTransformationType())
    transformationDynamicTypeRegistry.register(new SepiaTransformationType())
    transformationDynamicTypeRegistry.register(new GrayscaleTransformationType())
    transformationDynamicTypeRegistry.register(new SharpenTransformationType())
    transformationDynamicTypeRegistry.register(new ContainTransformationType())
    transformationDynamicTypeRegistry.register(new CropTransformationType())
    transformationDynamicTypeRegistry.register(new FrameTransformationType())
    transformationDynamicTypeRegistry.register(new RotateTransformationType())
    transformationDynamicTypeRegistry.register(new MirrorTransformationType())
    
    isRegistered = true
  } catch (error) {
    console.error('Error during transformation types initialization:', error)
  }
}

initializeTransformationTypes()
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
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { TransformationDynamicTypeAbstract } from './transformation-dynamic-type-abstract'
import { createTransformationToolStripBox, type BaseTransformationToolStripBoxProps } from '../components/transformation-toolstrip-boxes/transformation-toolstrip-box-abstract'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

@injectable()
export class TransformationDynamicTypeRegistry extends DynamicTypeRegistryAbstract<TransformationDynamicTypeAbstract> {
  public static readonly SERVICE_ID = 'image-thumbnails.transformation-dynamic-type-registry'
  
  private readonly toolstripBoxes = new Map<string, React.ComponentType<BaseTransformationToolStripBoxProps>>()

  registerDynamicType(type: TransformationDynamicTypeAbstract): void {
    super.registerDynamicType(type)
    
    try {
      this.toolstripBoxes.set(type.getId(), createTransformationToolStripBox(type))
    } catch (error) {
      trackError(new GeneralError(`Failed to create toolstrip box for transformation type "${type.getId()}": ${error}`))
    }
  }

  overrideDynamicType(type: TransformationDynamicTypeAbstract): void {
    super.overrideDynamicType(type)
    
    try {
      this.toolstripBoxes.set(type.getId(), createTransformationToolStripBox(type))
    } catch (error) {
      trackError(new GeneralError(`Failed to override toolstrip box for transformation type "${type.getId()}": ${error}`))
    }
  }

  getToolStripBox(id: string): React.ComponentType<BaseTransformationToolStripBoxProps> | undefined {
    return this.toolstripBoxes.get(id)
  }

  // Backward compatibility methods
  register(type: TransformationDynamicTypeAbstract): void {
    this.registerDynamicType(type)
  }

  get(name: string): TransformationDynamicTypeAbstract | undefined {
    return this.getDynamicType(name, false)
  }

  getAll(): TransformationDynamicTypeAbstract[] {
    return this.getDynamicTypes()
  }
}

export const transformationDynamicTypeRegistry = new TransformationDynamicTypeRegistry()

let isRegistered = false

// Import transformation types - synchronous imports for immediate registration
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
    
    isRegistered = true
  } catch (error) {
    trackError(new GeneralError(`Error during transformation types initialization: ${error}`))
  }
}

// Initialize transformation types on import
initializeTransformationTypes()
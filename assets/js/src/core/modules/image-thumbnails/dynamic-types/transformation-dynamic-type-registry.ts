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

  getByGroup(group: string): TransformationDynamicTypeInterface[] {
    return this.getAll().filter(type => type.getGroup() === group)
  }

  getBySubGroup(subGroup: string): TransformationDynamicTypeInterface[] {
    return this.getAll().filter(type => type.getSubGroup() === subGroup)
  }
}

export const transformationDynamicTypeRegistry = new TransformationDynamicTypeRegistry()

let isRegistered = false

// Synchronous imports for immediate registration
import { ResizeTransformationType } from './resize/resize-transformation-type'
import { ScaleByHeightTransformationType } from './scale-by-height/scale-by-height-transformation-type'
import { TrimTransformationType } from './trim/trim-transformation-type'
import { EffectsTransformationType } from './effects/effects-transformation-type'
import { CoverTransformationType } from './cover/cover-transformation-type'
import { ScaleByWidthTransformationType } from './scale-by-width/scale-by-width-transformation-type'

export function initializeTransformationTypes(): void {
  if (isRegistered) return
  
  try {
    transformationDynamicTypeRegistry.register(new CoverTransformationType())
    transformationDynamicTypeRegistry.register(new ResizeTransformationType())
    transformationDynamicTypeRegistry.register(new ScaleByWidthTransformationType())
    transformationDynamicTypeRegistry.register(new ScaleByHeightTransformationType())
    transformationDynamicTypeRegistry.register(new TrimTransformationType())
    transformationDynamicTypeRegistry.register(new EffectsTransformationType())
    
    isRegistered = true
  } catch (error) {
    console.error('Error during transformation types initialization:', error)
  }
}

initializeTransformationTypes()
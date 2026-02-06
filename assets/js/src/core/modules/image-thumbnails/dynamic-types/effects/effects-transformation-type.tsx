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

import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type TransformationDynamicTypeInterface, type FieldConfig } from '../transformation-dynamic-type-interface'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

export interface EffectsTransformationConfig {
  effect?: 'sepia' | 'grayscale' | 'sharpen'
  intensity?: number
}

export class EffectsTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getGroup (): string {
    return 'effects'
  }

  getSubGroup (): string {
    return 'color'
  }

  getName (): string {
    return 'effects'
  }

  getLabel (): string {
    return 'Effects'
  }

  getIcon (): React.ReactNode {
    return <Icon value="magic" />
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createSelectFieldConfig('effect', 'Effect Type', [
        { value: 'sepia', label: 'Sepia' },
        { value: 'grayscale', label: 'Grayscale' },
        { value: 'sharpen', label: 'Sharpen' }
      ], 'sepia'),
      this.createNumberFieldConfig('intensity', 'Intensity', '50', 50)
    ]
  }
}
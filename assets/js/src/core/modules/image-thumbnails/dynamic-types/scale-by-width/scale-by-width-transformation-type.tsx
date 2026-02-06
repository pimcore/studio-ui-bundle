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

export interface ScaleByWidthTransformationConfig {
  width?: number
  forceResize?: boolean
}

export class ScaleByWidthTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getSubGroup (): string {
    return 'scaling'
  }

  getName (): string {
    return 'scaleByWidth'
  }

  getLabel (): string {
    return 'Scale by Width'
  }

  getIcon (): React.ReactNode {
    return <Icon value="arrows-alt-h" />
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', '800', 800),
      this.createBooleanFieldConfig('forceResize', 'Force Resize', false)
    ]
  }
}
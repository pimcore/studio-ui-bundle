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

export interface ResizeTransformationConfig {
  width?: number
  height?: number
  positioning?: 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  forceResize?: boolean
}

export class ResizeTransformationType extends TransformationDynamicTypeAbstract implements TransformationDynamicTypeInterface {
  getSubGroup (): string {
    return 'resize'
  }

  getName (): string {
    return 'resize'
  }

  getLabel (): string {
    return 'Resize'
  }

  getIcon (): React.ReactNode {
    return <Icon value="expand" />
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', 'Enter width', undefined),
      this.createNumberFieldConfig('height', 'Height', 'Enter height', undefined),
      this.createSelectFieldConfig('positioning', 'Position', [
        { value: 'center', label: 'Center' },
        { value: 'topleft', label: 'Top Left' },
        { value: 'topright', label: 'Top Right' },
        { value: 'bottomleft', label: 'Bottom Left' },
        { value: 'bottomright', label: 'Bottom Right' }
      ], 'center'),
      this.createBooleanFieldConfig('forceResize', 'Force Resize', false)
    ]
  }
}
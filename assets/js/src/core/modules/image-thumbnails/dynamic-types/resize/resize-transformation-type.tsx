/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type FieldConfig } from '../transformation-dynamic-type-interface'

export interface ResizeTransformationConfig {
  width?: number
  height?: number
  positioning?: 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  forceResize?: boolean
}

@injectable()
export class ResizeTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'resize'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Resize'
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

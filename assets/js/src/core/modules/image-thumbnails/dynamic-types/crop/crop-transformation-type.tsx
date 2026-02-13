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

import { injectable } from 'inversify'
import { TransformationDynamicTypeAbstract } from '../transformation-dynamic-type-abstract'
import { type FieldConfig } from '../transformation-dynamic-type-interface'

export interface CropTransformationConfig {
  width?: number
  height?: number
  x?: number
  y?: number
}

@injectable()
export class CropTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'crop'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Crop'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', 'Enter width value'),
      this.createNumberFieldConfig('height', 'Height', 'Enter height value'),
      this.createNumberFieldConfig('x', 'X Position', 'Enter X coordinate'),
      this.createNumberFieldConfig('y', 'Y Position', 'Enter Y coordinate')
    ]
  }
}
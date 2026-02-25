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

export interface RoundCornersTransformationConfig {
  width?: number
  height?: number
}

@injectable()
export class RoundCornersTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'roundCorners'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Round Corners'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('width', 'Width', 'Enter corner width radius', 10),
      this.createNumberFieldConfig('height', 'Height', 'Enter corner height radius', 10)
    ]
  }
}

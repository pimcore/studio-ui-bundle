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

export interface SharpenTransformationConfig {
  radius?: number
  sigma?: number
  amount?: number
  threshold?: number
}

@injectable()
export class SharpenTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'sharpen'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Sharpen'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('radius', 'Radius', 'Enter radius value'),
      this.createNumberFieldConfig('sigma', 'Sigma', 'Enter sigma value'),
      this.createNumberFieldConfig('amount', 'Amount', 'Enter amount value'),
      this.createNumberFieldConfig('threshold', 'Threshold', 'Enter threshold value', 0.0)
    ]
  }
}

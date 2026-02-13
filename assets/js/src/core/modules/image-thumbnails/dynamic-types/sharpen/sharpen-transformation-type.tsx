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
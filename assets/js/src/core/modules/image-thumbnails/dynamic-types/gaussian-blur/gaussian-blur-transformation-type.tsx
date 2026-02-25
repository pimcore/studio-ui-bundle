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

export interface GaussianBlurTransformationConfig {
  radius?: number
  sigma?: number
}

@injectable()
export class GaussianBlurTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'gaussianBlur'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Gaussian Blur'
  }

  getFieldConfig (): FieldConfig[] {
    return [
      this.createNumberFieldConfig('radius', 'Radius', 'Enter radius value (0+)', 0),
      this.createNumberFieldConfig('sigma', 'Sigma', 'Enter sigma value (1+)', 1)
    ]
  }
}

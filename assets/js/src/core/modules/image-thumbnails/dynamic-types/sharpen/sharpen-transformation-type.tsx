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
import type { TransformationComponent } from '../../types/transformation-component-types'
import { SharpenTransformationComponent } from './sharpen-transformation-component'

export interface SharpenTransformationConfig {
  radius?: number
  sigma?: number
  amount?: number
  threshold?: number
}

@injectable()
export class SharpenTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'sharpen'

  getLabel (): string {
    return 'Sharpen (Imagick)'
  }

  getReactComponent (): TransformationComponent {
    return SharpenTransformationComponent
  }
}

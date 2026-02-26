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
import { TrimTransformationComponent } from './trim-transformation-component'
import type { TransformationComponent } from '../../types/transformation-component-types'

export interface TrimTransformationConfig {
  tolerance?: number
}

@injectable()
export class TrimTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'trim'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Trim'
  }

  getReactComponent (): TransformationComponent {
    return TrimTransformationComponent
  }
}

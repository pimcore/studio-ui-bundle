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
import { ScaleByHeightTransformationComponent } from './scale-by-height-transformation-component'

export interface ScaleByHeightTransformationConfig {
  height?: number
  forceResize?: boolean
}

@injectable()
export class ScaleByHeightTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'scaleByHeight'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Scale by Height'
  }

  getReactComponent (): TransformationComponent {
    return ScaleByHeightTransformationComponent
  }
}

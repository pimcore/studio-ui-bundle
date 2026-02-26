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
import { BrightnessSaturationTransformationComponent } from './brightness-saturation-transformation-component'
import type { TransformationComponent } from '../types/transformation-component-types'

export interface BrightnessSaturationTransformationConfig {
  brightness?: number
  saturation?: number
  hue?: number
}

@injectable()
export class BrightnessSaturationTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'brightnessSaturation'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Brightness/Saturation'
  }

  getReactComponent (): TransformationComponent {
    return BrightnessSaturationTransformationComponent
  }
}

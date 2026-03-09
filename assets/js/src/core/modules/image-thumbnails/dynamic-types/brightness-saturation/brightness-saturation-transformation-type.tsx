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
import { type TransformationComponent } from '../../types/transformation-component-types'

export interface BrightnessSaturationTransformationConfig {
  brightness?: number
  saturation?: number
  hue?: number
}

@injectable()
export class BrightnessSaturationTransformationType extends TransformationDynamicTypeAbstract<BrightnessSaturationTransformationConfig> {
  readonly id = 'brightnessSaturation'

  getLabel (): string {
    return 'Brightness / Saturation / Hue (Imagick)'
  }

  getSummary (config: BrightnessSaturationTransformationConfig): string {
    return `Brightness / Saturation / Hue (Imagick) (${config.brightness ?? 100}%, ${config.saturation ?? 100}%, ${config.hue ?? 100}%)`
  }

  createDefaultConfig (): BrightnessSaturationTransformationConfig {
    return {
      brightness: 100,
      saturation: 100,
      hue: 100
    }
  }

  getReactComponent (): TransformationComponent {
    return BrightnessSaturationTransformationComponent
  }
}

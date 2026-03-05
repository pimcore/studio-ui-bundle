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
import { TransformationDynamicTypeAbstract } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-abstract'
import { ColorChannelMixerVideoTransformationComponent } from './color-channel-mixer-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface ColorChannelMixerVideoTransformationConfig {
  effect?: string
}

const GRAYSCALE_MATRIX = '.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3'
const SEPIA_MATRIX = '.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131'
const COLD_MATRIX = '.9:0:0:0:0:1.1:0:0:0:0:1:0:0:0:0:1'

const EFFECT_LABELS: Record<string, string> = {
  [GRAYSCALE_MATRIX]: 'Grayscale',
  [SEPIA_MATRIX]: 'Sepia',
  [COLD_MATRIX]: 'Cold'
}

@injectable()
export class ColorChannelMixerVideoTransformationType extends TransformationDynamicTypeAbstract<ColorChannelMixerVideoTransformationConfig> {
  readonly id = 'colorChannelMixer'

  getLabel (): string {
    return 'Color Channel Mixer'
  }

  getSummary (config: ColorChannelMixerVideoTransformationConfig): string {
    const label = config.effect != null
      ? (EFFECT_LABELS[config.effect] ?? config.effect)
      : 'Grayscale'
    return `Color Channel Mixer (${label})`
  }

  createDefaultConfig (): ColorChannelMixerVideoTransformationConfig {
    return {
      effect: GRAYSCALE_MATRIX
    }
  }

  getReactComponent (): TransformationComponent {
    return ColorChannelMixerVideoTransformationComponent
  }
}

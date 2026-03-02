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
  effect?: 'grayscale' | 'sepia' | 'cold'
}

@injectable()
export class ColorChannelMixerVideoTransformationType extends TransformationDynamicTypeAbstract<ColorChannelMixerVideoTransformationConfig> {
  readonly id = 'colorChannelMixer'

  getLabel (): string {
    return 'Color Channel Mixer'
  }

  getSummary (config: ColorChannelMixerVideoTransformationConfig): string {
    const effectLabel = config.effect != null
      ? config.effect.charAt(0).toUpperCase() + config.effect.slice(1)
      : 'Grayscale'
    return `Color Channel Mixer (${effectLabel})`
  }

  createDefaultConfig (): ColorChannelMixerVideoTransformationConfig {
    return {
      effect: 'grayscale'
    }
  }

  getReactComponent (): TransformationComponent {
    return ColorChannelMixerVideoTransformationComponent
  }
}

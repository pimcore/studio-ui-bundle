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
import { SetFramerateVideoTransformationComponent } from './set-framerate-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface SetFramerateVideoTransformationConfig {
  fps?: number
}

@injectable()
export class SetFramerateVideoTransformationType extends TransformationDynamicTypeAbstract<SetFramerateVideoTransformationConfig> {
  readonly id = 'setFramerate'

  getLabel (): string {
    return 'Set Framerate'
  }

  getSummary (config: SetFramerateVideoTransformationConfig): string {
    return `Set Framerate ${config.fps ?? 1}fps`
  }

  createDefaultConfig (): SetFramerateVideoTransformationConfig {
    return {
      fps: 1
    }
  }

  getReactComponent (): TransformationComponent {
    return SetFramerateVideoTransformationComponent
  }
}

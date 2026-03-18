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
import { ScaleByHeightVideoTransformationComponent } from './scale-by-height-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface ScaleByHeightVideoTransformationConfig {
  height?: number
}

@injectable()
export class ScaleByHeightVideoTransformationType extends TransformationDynamicTypeAbstract<ScaleByHeightVideoTransformationConfig> {
  readonly id = 'scaleByHeight'

  getLabel (): string {
    return 'Scale by Height'
  }

  getSummary (config: ScaleByHeightVideoTransformationConfig): string {
    return `Scale by Height ${config.height ?? '?'}`
  }

  createDefaultConfig (): ScaleByHeightVideoTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return ScaleByHeightVideoTransformationComponent
  }
}

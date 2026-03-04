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
import { ScaleByWidthVideoTransformationComponent } from './scale-by-width-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface ScaleByWidthVideoTransformationConfig {
  width?: number
}

@injectable()
export class ScaleByWidthVideoTransformationType extends TransformationDynamicTypeAbstract<ScaleByWidthVideoTransformationConfig> {
  readonly id = 'scaleByWidth'

  getLabel (): string {
    return 'Scale by Width'
  }

  getSummary (config: ScaleByWidthVideoTransformationConfig): string {
    return `Scale by Width ${config.width ?? '?'}`
  }

  createDefaultConfig (): ScaleByWidthVideoTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return ScaleByWidthVideoTransformationComponent
  }
}

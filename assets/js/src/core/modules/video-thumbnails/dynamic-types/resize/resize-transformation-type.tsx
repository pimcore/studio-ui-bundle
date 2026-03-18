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
import { ResizeVideoTransformationComponent } from './resize-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface ResizeVideoTransformationConfig {
  width?: number
  height?: number
}

@injectable()
export class ResizeVideoTransformationType extends TransformationDynamicTypeAbstract<ResizeVideoTransformationConfig> {
  readonly id = 'resize'

  getLabel (): string {
    return 'Resize'
  }

  getSummary (config: ResizeVideoTransformationConfig): string {
    return `Resize ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  createDefaultConfig (): ResizeVideoTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return ResizeVideoTransformationComponent
  }
}

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
import { ResizeTransformationComponent } from './resize-transformation-component'
import { type TransformationComponent } from '../../types/transformation-component-types'

export interface ResizeTransformationConfig {
  width?: number
  height?: number
}

@injectable()
export class ResizeTransformationType extends TransformationDynamicTypeAbstract<ResizeTransformationConfig> {
  readonly id = 'resize'

  getLabel (): string {
    return 'Resize'
  }

  getSummary (config: ResizeTransformationConfig): string {
    return `Resize ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  getReactComponent (): TransformationComponent {
    return ResizeTransformationComponent
  }
}

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
import { type TransformationComponent } from '../../types/transformation-component-types'
import { CropTransformationComponent } from './crop-transformation-component'

export interface CropTransformationConfig {
  width?: number
  height?: number
  x?: number
  y?: number
}

@injectable()
export class CropTransformationType extends TransformationDynamicTypeAbstract<CropTransformationConfig> {
  readonly id = 'crop'

  getLabel (): string {
    return 'Crop'
  }

  getSummary (config: CropTransformationConfig): string {
    return `Crop ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  getReactComponent (): TransformationComponent {
    return CropTransformationComponent
  }
}

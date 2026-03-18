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
import { RoundCornersTransformationComponent } from './round-corners-transformation-component'

export interface RoundCornersTransformationConfig {
  width?: number
  height?: number
}

@injectable()
export class RoundCornersTransformationType extends TransformationDynamicTypeAbstract<RoundCornersTransformationConfig> {
  readonly id = 'roundCorners'

  getLabel (): string {
    return 'Round Corners (Imagick)'
  }

  getSummary (config: RoundCornersTransformationConfig): string {
    return `Round Corners (Imagick) ${config.width ?? '?'}x${config.height ?? '?'}px`
  }

  getReactComponent (): TransformationComponent {
    return RoundCornersTransformationComponent
  }
}

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
import { GaussianBlurTransformationComponent } from './gaussian-blur-transformation-component'

export interface GaussianBlurTransformationConfig {
  radius?: number
  sigma?: number
}

@injectable()
export class GaussianBlurTransformationType extends TransformationDynamicTypeAbstract<GaussianBlurTransformationConfig> {
  readonly id = 'gaussianBlur'

  getLabel (): string {
    return 'Gaussian Blur'
  }

  getSummary (config: GaussianBlurTransformationConfig): string {
    return `Gaussian Blur (radius: ${config.radius ?? '?'}, sigma: ${config.sigma ?? '?'})`
  }

  getReactComponent (): TransformationComponent {
    return GaussianBlurTransformationComponent
  }
}

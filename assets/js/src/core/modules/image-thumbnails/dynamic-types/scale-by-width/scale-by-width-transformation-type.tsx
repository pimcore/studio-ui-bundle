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
import type { TransformationComponent } from '../../types/transformation-component-types'
import { ScaleByWidthTransformationComponent } from './scale-by-width-transformation-component'

export interface ScaleByWidthTransformationConfig {
  width?: number
  forceResize?: boolean
}

@injectable()
export class ScaleByWidthTransformationType extends TransformationDynamicTypeAbstract<ScaleByWidthTransformationConfig> {
  readonly id = 'scaleByWidth'

  getLabel (): string {
    return 'Scale by Width'
  }

  getSummary (config: ScaleByWidthTransformationConfig): string {
    return `Scale by Width ${config.width ?? '?'}px`
  }

  getReactComponent (): TransformationComponent {
    return ScaleByWidthTransformationComponent
  }
}

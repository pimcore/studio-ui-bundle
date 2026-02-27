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
  positioning?: 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  forceResize?: boolean
}

@injectable()
export class ResizeTransformationType extends TransformationDynamicTypeAbstract<ResizeTransformationConfig> {
  readonly id = 'resize'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Resize'
  }

  createDefaultConfig (): ResizeTransformationConfig {
    return {
      width: 100,
      height: 100,
      positioning: 'center',
      forceResize: false
    }
  }

  getReactComponent (): TransformationComponent {
    return ResizeTransformationComponent
  }
}

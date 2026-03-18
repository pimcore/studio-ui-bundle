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
import { FrameTransformationComponent } from './frame-transformation-component'

export interface FrameTransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

@injectable()
export class FrameTransformationType extends TransformationDynamicTypeAbstract<FrameTransformationConfig> {
  readonly id = 'frame'

  getLabel (): string {
    return 'Frame'
  }

  getSummary (config: FrameTransformationConfig): string {
    return `Frame ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  createDefaultConfig (): FrameTransformationConfig {
    return {
      width: 100,
      height: 100,
      forceResize: false
    }
  }

  getReactComponent (): TransformationComponent {
    return FrameTransformationComponent
  }
}

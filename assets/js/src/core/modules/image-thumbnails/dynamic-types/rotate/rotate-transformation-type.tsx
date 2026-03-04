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
import { RotateTransformationComponent } from './rotate-transformation-component'
import { type TransformationComponent } from '../../types/transformation-component-types'

export interface RotateTransformationConfig {
  angle?: number
}

@injectable()
export class RotateTransformationType extends TransformationDynamicTypeAbstract<RotateTransformationConfig> {
  readonly id = 'rotate'

  getLabel (): string {
    return 'Rotate'
  }

  getSummary (config: RotateTransformationConfig): string {
    return `Rotate ${config.angle ?? '?'}°`
  }

  createDefaultConfig (): RotateTransformationConfig {
    return {
      angle: 90
    }
  }

  getReactComponent (): TransformationComponent {
    return RotateTransformationComponent
  }
}

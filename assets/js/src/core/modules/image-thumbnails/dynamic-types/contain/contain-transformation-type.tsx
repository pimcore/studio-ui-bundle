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
import { ContainTransformationComponent } from './contain-transformation-component'

export interface ContainTransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

@injectable()
export class ContainTransformationType extends TransformationDynamicTypeAbstract<ContainTransformationConfig> {
  readonly id = 'contain'

  getLabel (): string {
    return 'Contain'
  }

  getSummary (config: ContainTransformationConfig): string {
    return `Contain ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  getReactComponent (): TransformationComponent {
    return ContainTransformationComponent
  }
}

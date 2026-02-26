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
import { TransformationComponent } from '../../types/transformation-component-types'
import { ContainTransformationComponent } from './contain-transformation-component'

export interface ContainTransformationConfig {
  width?: number
  height?: number
  forceResize?: boolean
}

@injectable()
export class ContainTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'contain'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Contain'
  }

  getReactComponent (): TransformationComponent {
    return ContainTransformationComponent
  }
}

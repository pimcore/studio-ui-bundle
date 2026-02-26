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
import { SetBackgroundImageTransformationComponent } from './set-background-image-transformation-component'

export interface SetBackgroundImageTransformationConfig {
  asset?: number
  path?: string
  mode?: string
}

@injectable()
export class SetBackgroundImageTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'setBackgroundImage'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Set Background Image'
  }

  getReactComponent (): TransformationComponent {
    return SetBackgroundImageTransformationComponent
  }
}

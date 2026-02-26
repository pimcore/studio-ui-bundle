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
import { AddOverlayTransformationComponent } from './add-overlay-transformation-component'
import type { TransformationComponent } from '../types/transformation-component-types'

export interface AddOverlayTransformationConfig {
  asset?: number
  path?: string
  x?: number
  y?: number
  origin?: string
  alpha?: number
}

@injectable()
export class AddOverlayTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'addOverlay'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return 'Add Overlay'
  }

  getReactComponent (): TransformationComponent {
    return AddOverlayTransformationComponent
  }
}

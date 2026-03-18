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
import { AddOverlayFitTransformationComponent } from './add-overlay-fit-transformation-component'
import { type TransformationComponent } from '../../types/transformation-component-types'

export interface AddOverlayFitTransformationConfig {
  asset?: number
  path?: string
  composite?: string
}

@injectable()
export class AddOverlayFitTransformationType extends TransformationDynamicTypeAbstract<AddOverlayFitTransformationConfig> {
  readonly id = 'addOverlayFit'

  getLabel (): string {
    return 'Add Overlay Fit (Imagick)'
  }

  getSummary (config: AddOverlayFitTransformationConfig): string {
    const pathPart = config.path == null ? '' : ` (${config.path})`
    return `Add Overlay Fit (Imagick)${pathPart}`
  }

  getReactComponent (): TransformationComponent {
    return AddOverlayFitTransformationComponent
  }
}

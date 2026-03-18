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
import { ApplyMaskTransformationComponent } from './apply-mask-transformation-component'

export interface ApplyMaskTransformationConfig {
  asset?: number
  path?: string
}

@injectable()
export class ApplyMaskTransformationType extends TransformationDynamicTypeAbstract<ApplyMaskTransformationConfig> {
  readonly id = 'applyMask'

  getLabel (): string {
    return 'Apply Mask (Imagick)'
  }

  getSummary (config: ApplyMaskTransformationConfig): string {
    const pathPart = config.path == null ? '' : ` (${config.path})`
    return `Apply Mask (Imagick)${pathPart}`
  }

  getReactComponent (): TransformationComponent {
    return ApplyMaskTransformationComponent
  }
}

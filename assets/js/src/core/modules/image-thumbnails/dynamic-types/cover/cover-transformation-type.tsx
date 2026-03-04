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
import { CoverTransformationComponent } from './cover-transformation-component'

export interface CoverTransformationConfig {
  width?: number
  height?: number
  positioning?: 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  forceResize?: boolean
}

@injectable()
export class CoverTransformationType extends TransformationDynamicTypeAbstract<CoverTransformationConfig> {
  readonly id = 'cover'

  getLabel (): string {
    return 'Cover (Focal Point Support)'
  }

  getSummary (config: CoverTransformationConfig): string {
    return `Cover (Focal Point Support) ${config.width ?? '?'}x${config.height ?? '?'}`
  }

  getReactComponent (): TransformationComponent {
    return CoverTransformationComponent
  }
}

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
import { TiffOriginalTransformationComponent } from './tiff-original-transformation-component'
import type { TransformationComponent } from '../../types/transformation-component-types'

export type TiffOriginalTransformationConfig = Record<string, never>

@injectable()
export class TiffOriginalTransformationType extends TransformationDynamicTypeAbstract<TiffOriginalTransformationConfig> {
  readonly id = 'tifforiginal'

  getLabel (): string {
    return 'Use original TIFF (only PRINT)'
  }

  createDefaultConfig (): TiffOriginalTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return TiffOriginalTransformationComponent
  }
}

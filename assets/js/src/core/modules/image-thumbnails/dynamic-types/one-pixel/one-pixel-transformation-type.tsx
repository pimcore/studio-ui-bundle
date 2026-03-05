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
import { OnePixelTransformationComponent } from './one-pixel-transformation-component'
import { type TransformationComponent } from '../../types/transformation-component-types'

export type OnePixelTransformationConfig = Record<string, never>

@injectable()
export class OnePixelTransformationType extends TransformationDynamicTypeAbstract<OnePixelTransformationConfig> {
  readonly id = '1x1_pixel'

  getLabel (): string {
    return '1x1 Pixel Placeholder'
  }

  createDefaultConfig (): OnePixelTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return OnePixelTransformationComponent
  }
}

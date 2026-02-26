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
import { NoConfigurationComponent } from '../../components/no-config-component'
import type { TransformationComponent } from '../types/transformation-component-types'

export type OnePixelTransformationConfig = Record<string, never>

@injectable()
export class OnePixelTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = '1x1_pixel'

  getName (): string {
    return this.id
  }

  getLabel (): string {
    return '1x1 Pixel'
  }

  getReactComponent (): TransformationComponent {
    return NoConfigurationComponent
  }

  createDefaultConfig (): any {
    return {}
  }
}

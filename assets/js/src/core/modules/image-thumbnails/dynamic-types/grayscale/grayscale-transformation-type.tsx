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
import { type TransformationComponent } from '../../types/transformation-component-types'

export type GrayscaleTransformationConfig = Record<string, never>

@injectable()
export class GrayscaleTransformationType extends TransformationDynamicTypeAbstract<GrayscaleTransformationConfig> {
  readonly id = 'grayscale'

  getLabel (): string {
    return 'Grayscale'
  }

  createDefaultConfig (): GrayscaleTransformationConfig {
    return {}
  }

  getReactComponent (): TransformationComponent {
    return NoConfigurationComponent
  }
}

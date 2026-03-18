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
import { SetBackgroundColorTransformationComponent } from './set-background-color-transformation-component'

export interface SetBackgroundColorTransformationConfig {
  color?: string
}

@injectable()
export class SetBackgroundColorTransformationType extends TransformationDynamicTypeAbstract<SetBackgroundColorTransformationConfig> {
  readonly id = 'setBackgroundColor'

  getLabel (): string {
    return 'Set Background Color'
  }

  getSummary (config: SetBackgroundColorTransformationConfig): string {
    return `Background Color: ${config.color ?? '#ffffff'}`
  }

  getReactComponent (): TransformationComponent {
    return SetBackgroundColorTransformationComponent
  }
}

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
import { TransformationDynamicTypeAbstract } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-abstract'
import { CutVideoTransformationComponent } from './cut-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export interface CutVideoTransformationConfig {
  start?: string
  duration?: string
}

@injectable()
export class CutVideoTransformationType extends TransformationDynamicTypeAbstract<CutVideoTransformationConfig> {
  readonly id = 'cut'

  getLabel (): string {
    return 'Cut'
  }

  getSummary (config: CutVideoTransformationConfig): string {
    return `Cut from ${config.start ?? '00:00:00'} (${config.duration ?? '00:00:00'})`
  }

  createDefaultConfig (): CutVideoTransformationConfig {
    return {
      start: '00:00:00',
      duration: '00:00:00'
    }
  }

  getReactComponent (): TransformationComponent {
    return CutVideoTransformationComponent
  }
}

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
import { MuteTransformationComponent } from './mute-transformation-component'
import { type TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

@injectable()
export class MuteVideoTransformationType extends TransformationDynamicTypeAbstract {
  readonly id = 'mute'

  getLabel (): string {
    return 'Mute'
  }

  getReactComponent (): TransformationComponent {
    return MuteTransformationComponent
  }
}

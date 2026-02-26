/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import type { TransformationComponent } from '../types/transformation-component-types'

export interface TransformationDynamicTypeInterface extends DynamicTypeAbstract {
  getId: () => string
  getName: () => string
  getLabel: () => string
  getReactComponent: () => TransformationComponent
  createDefaultConfig: () => any
  configureTransformation: () => Promise<null>
}

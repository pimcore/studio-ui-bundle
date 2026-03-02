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
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type TransformationDynamicTypeAbstract } from './transformation-dynamic-type-abstract'

@injectable()
export class TransformationDynamicTypeRegistry extends DynamicTypeRegistryAbstract<TransformationDynamicTypeAbstract> {
  public static readonly SERVICE_ID = 'image-thumbnails.transformation-dynamic-type-registry'

  registerDynamicType (type: TransformationDynamicTypeAbstract): void {
    super.registerDynamicType(type)
  }

  overrideDynamicType (type: TransformationDynamicTypeAbstract): void {
    super.overrideDynamicType(type)
  }
}

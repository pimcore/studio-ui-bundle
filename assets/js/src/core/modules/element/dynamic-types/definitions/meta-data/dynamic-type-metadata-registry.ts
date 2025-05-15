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
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type DynamicTypeMetadataAbstract } from './dynamic-type-metadata-abstract'

@injectable()
export class DynamicTypeMetaDataRegistry extends DynamicTypeRegistryAbstract<DynamicTypeMetadataAbstract> {
  getTypeSelectionTypes (): Map<string, DynamicTypeMetadataAbstract> {
    const visibleTypes = new Map<string, DynamicTypeMetadataAbstract>()

    this.dynamicTypes.forEach((type, id) => {
      if (type.visibleInTypeSelection) {
        visibleTypes.set(id, type)
      }
    })

    return visibleTypes
  }
}

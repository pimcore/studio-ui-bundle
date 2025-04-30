/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import {
  type AbstractBatchEditDefinition,
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'

@injectable()
export class DynamicTypeBatchEditRegistry extends DynamicTypeRegistryAbstract<DynamicTypeBatchEditAbstract> {
  getComponent (id: string, props: AbstractBatchEditDefinition): ReactElement<AbstractBatchEditDefinition> {
    return this.getDynamicType(id).getBatchEditComponent(props)
  }
}

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
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type BatchEdit } from '@Pimcore/modules/data-object/listing/batch-actions/batch-edit-modal/batch-edit-provider'

export interface AbstractBatchEditDefinition {
  batchEdit: BatchEdit
}

export abstract class DynamicTypeBatchEditAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getBatchEditComponent (props: AbstractBatchEditDefinition): ReactElement<AbstractBatchEditDefinition>
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { injectable } from 'inversify'
import {
  type AbstractBatchEditDefinition,
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { DynamicTypeBatchEditDataObjectAdapterComponent } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/data-object-adapter/dynamic-type-batch-edit-data-object-adapter-component'

@injectable()
export class DynamicTypeBatchEditDataObjectAdapter implements DynamicTypeBatchEditAbstract {
  id = 'dataobject.adapter'

  getBatchEditComponent (props: AbstractBatchEditDefinition): ReactElement<AbstractBatchEditDefinition> {
    return (
      <DynamicTypeBatchEditDataObjectAdapterComponent { ...props } />
    )
  }
}

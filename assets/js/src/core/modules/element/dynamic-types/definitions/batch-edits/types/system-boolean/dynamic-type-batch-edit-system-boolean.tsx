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
import { type DynamicTypeBatchEditAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { DynamicTypeBatchEditSystemBooleanComponent, type DynamicTypeBatchEditSystemBooleanProps } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/system-boolean/dynamic-type-batch-edit-system-boolean-component'

@injectable()
export class DynamicTypeBatchEditSystemBoolean implements DynamicTypeBatchEditAbstract {
  id = 'system.boolean'

  getBatchEditComponent (props: DynamicTypeBatchEditSystemBooleanProps): ReactElement<DynamicTypeBatchEditSystemBooleanProps> {
    return (
      <DynamicTypeBatchEditSystemBooleanComponent { ...props } />
    )
  }
}

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
import { DynamicTypeBatchEditCheckboxComponent, type DynamicTypeBatchEditCheckboxProps } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/checkbox/dynamic-type-batch-edit-checkbox-component'

@injectable()
export class DynamicTypeBatchEditCheckbox implements DynamicTypeBatchEditAbstract {
  id = 'checkbox'

  getBatchEditComponent (props: DynamicTypeBatchEditCheckboxProps): ReactElement<DynamicTypeBatchEditCheckboxProps> {
    return (
      <DynamicTypeBatchEditCheckboxComponent { ...props } />
    )
  }
}

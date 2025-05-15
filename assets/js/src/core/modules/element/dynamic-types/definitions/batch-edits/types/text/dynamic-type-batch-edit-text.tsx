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
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import {
  DynamicTypeBatchEditTextComponent,
  type DynamicTypeBatchEditTextProps
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/text/dynamic-type-batch-edit-text-component'

@injectable()
export class DynamicTypeBatchEditText implements DynamicTypeBatchEditAbstract {
  id = 'input'

  getBatchEditComponent (props: DynamicTypeBatchEditTextProps): ReactElement<DynamicTypeBatchEditTextProps> {
    return (
      <DynamicTypeBatchEditTextComponent { ...props } />
    )
  }
}

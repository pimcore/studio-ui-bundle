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
  DynamicTypeBatchEditTextAreaComponent,
  type DynamicTypeBatchEditTextAreaProps
} from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/components/text/dynamic-type-batch-edit-text-area-component'

@injectable()
export class DynamicTypeBatchEditTextArea implements DynamicTypeBatchEditAbstract {
  id = 'textarea'

  getBatchEditComponent (props: DynamicTypeBatchEditTextAreaProps): ReactElement<DynamicTypeBatchEditTextAreaProps> {
    return (
      <DynamicTypeBatchEditTextAreaComponent { ...props } />
    )
  }
}

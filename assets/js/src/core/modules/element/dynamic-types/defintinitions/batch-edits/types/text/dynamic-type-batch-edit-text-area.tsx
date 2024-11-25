/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { type ReactElement } from 'react'
import { injectable } from 'inversify'
import {
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-abstract'
import {
  DynamicTypeBatchEditTextAreaComponent,
  type DynamicTypeBatchEditTextAreaProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/types/components/dynamic-type-batch-edit-text-area-component'

@injectable()
export class DynamicTypeBatchEditTextArea implements DynamicTypeBatchEditAbstract {
  id = 'textarea'

  getBatchEditComponent (props: DynamicTypeBatchEditTextAreaProps): ReactElement<DynamicTypeBatchEditTextAreaProps> {
    return (
      <DynamicTypeBatchEditTextAreaComponent { ...props } />
    )
  }
}

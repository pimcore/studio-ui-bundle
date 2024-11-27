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
  DynamicTypeBatchEditTextComponent,
  type DynamicTypeBatchEditTextProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/types/components/dynamic-type-batch-edit-text-component'

@injectable()
export class DynamicTypeBatchEditText implements DynamicTypeBatchEditAbstract {
  id = 'input'

  getBatchEditComponent (props: DynamicTypeBatchEditTextProps): ReactElement<DynamicTypeBatchEditTextProps> {
    return (
      <DynamicTypeBatchEditTextComponent { ...props } />
    )
  }
}

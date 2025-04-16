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

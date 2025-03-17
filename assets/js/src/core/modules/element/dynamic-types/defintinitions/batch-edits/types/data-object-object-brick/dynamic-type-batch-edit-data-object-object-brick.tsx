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
  type AbstractBatchEditDefinition,
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-abstract'
import { DynamicTypeBatchEditDataObjectObjectBrickComponent } from '../../components/data-object-object-brick/dynamic-type-batch-edit-data-object-object-brick-component'

@injectable()
export class DynamicTypeBatchEditDataObjectObjectBrick implements DynamicTypeBatchEditAbstract {
  id = 'dataobject.objectbrick'

  getBatchEditComponent (props: AbstractBatchEditDefinition): ReactElement<AbstractBatchEditDefinition> {
    return (
      <DynamicTypeBatchEditDataObjectObjectBrickComponent { ...props } />
    )
  }
}

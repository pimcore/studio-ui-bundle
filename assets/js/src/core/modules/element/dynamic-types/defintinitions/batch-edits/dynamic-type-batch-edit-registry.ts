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

import { type ReactElement } from 'react'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'
import {
  type AbstractBatchEditDefinition,
  type DynamicTypeBatchEditAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-abstract'

@injectable()
export class DynamicTypeBatchEditRegistry extends DynamicTypeRegistryAbstract<DynamicTypeBatchEditAbstract> {
  getComponent (id: string, props: AbstractBatchEditDefinition): ReactElement<AbstractBatchEditDefinition> {
    return this.getDynamicType(id).getBatchEditComponent(props)
  }
}

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
import { type AbstractFieldFilterDefinition, type DynamicTypeFieldFilterAbstract } from './dynamic-type-field-filter-abstract'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'

@injectable()
export class DynamicTypeFieldFilterRegistry extends DynamicTypeRegistryAbstract<DynamicTypeFieldFilterAbstract> {
  getComponent (id: string, props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition> {
    return this.getDynamicType(id).getFieldFilterComponent(props)
  }
}

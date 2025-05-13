/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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

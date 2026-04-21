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
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { DynamicTypeFieldFilterRelationComponent } from './dynamic-type-field-filter-relation-component'

@injectable()
export class DynamicTypeFieldFilterRelation extends DynamicTypeFieldFilterAbstract {
  id = 'relation'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Relation
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue as Array<{ type?: string, ids?: number[] }> | null | undefined
    return Array.isArray(value) && value.length > 0 &&
      value.some((entry) => typeof entry.type === 'string' && Array.isArray(entry.ids) && entry.ids.length > 0)
  }

  getFieldFilterComponent (): ReactElement<DynamicTypeFieldFilterAbstract> {
    return (
      <DynamicTypeFieldFilterRelationComponent />
    )
  }
}

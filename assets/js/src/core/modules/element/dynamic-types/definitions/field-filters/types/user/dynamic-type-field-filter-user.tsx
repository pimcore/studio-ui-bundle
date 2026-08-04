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
import { isArray, isEmpty } from 'lodash'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import {
  DynamicTypeFieldFilterUserComponent,
  type DynamicTypeFieldFilterUserProps
} from '../../components/dynamic-type-field-filter-user-component'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

/**
 * Field filter for the `system.user` columns (userModification / userOwner). Like the other
 * option-based filters, the frontend is "dumb": it hands the selected user ids to the backend,
 * which matches them against the user column. The filter applies only when at least one user is
 * selected.
 */
@injectable()
export class DynamicTypeFieldFilterUser extends DynamicTypeFieldFilterAbstract {
  id = FieldFilterFrontendType.User

  getFieldFilterType (): string {
    return FieldFilterFrontendType.User
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterUserProps): ReactElement<DynamicTypeFieldFilterUserProps> {
    return (
      <DynamicTypeFieldFilterUserComponent { ...props } />
    )
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    return isArray(value) && !isEmpty(value)
  }
}

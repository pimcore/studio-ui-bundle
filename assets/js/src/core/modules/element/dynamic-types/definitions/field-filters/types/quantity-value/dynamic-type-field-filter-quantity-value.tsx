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
import { DynamicTypeFieldFilterAbstractText } from '../../dynamic-type-field-filter-abstract-text'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { DynamicTypeFieldFilterQuantityValueComponent, type DynamicTypeFieldFilterQuantityValueProps } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-quantity-value-component'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { isNil } from 'lodash'

@injectable()
export class DynamicTypeFieldFilterQuantityValue extends DynamicTypeFieldFilterAbstractText {
  id = 'QuantityValue'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.QuantityValue
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterQuantityValueProps): ReactElement<DynamicTypeFieldFilterQuantityValueProps> {
    return <DynamicTypeFieldFilterQuantityValueComponent { ...props } />
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (value == null || typeof value !== 'object') {
      return false
    }

    return (
      (!isNil(value.is) && value.is !== '') ||
      (!isNil(value.from) && value.from !== '') ||
      (!isNil(value.to) && value.to !== '')
    ) &&
      value.unitId != null
  }
}

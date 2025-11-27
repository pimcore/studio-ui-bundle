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
import { DynamicTypeFieldFilterInputQuantityValueComponent, type DynamicTypeFieldFilterInputQuantityValueProps } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-input-quantity-value-component'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterInputQuantityValue extends DynamicTypeFieldFilterAbstractText {
  id = 'inputQuantityValue'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.InputQuantityValue
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterInputQuantityValueProps): ReactElement<DynamicTypeFieldFilterInputQuantityValueProps> {
    return <DynamicTypeFieldFilterInputQuantityValueComponent { ...props } />
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    return value.value !== '' && value.value !== null && value.unitId !== null
  }
}

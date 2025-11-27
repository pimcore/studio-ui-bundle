import React from 'react'
import { injectable } from 'inversify'
import { DynamicTypeFieldFilterAbstractText } from '../../dynamic-type-field-filter-abstract-text'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { ReactElement } from 'react'
import { DynamicTypeFieldFilterInputQuantityValueComponent, DynamicTypeFieldFilterInputQuantityValueProps } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-input-quantity-value-component'
import { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterInputQuantityValue extends DynamicTypeFieldFilterAbstractText {
  id = 'inputQuantityValue'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.InputQuantityValue
  }

  getFieldFilterComponent(props: DynamicTypeFieldFilterInputQuantityValueProps): ReactElement<DynamicTypeFieldFilterInputQuantityValueProps> {
    return <DynamicTypeFieldFilterInputQuantityValueComponent {...props} />
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    return value.unitId != null || value.value != null && value.value !== ''
  }
}

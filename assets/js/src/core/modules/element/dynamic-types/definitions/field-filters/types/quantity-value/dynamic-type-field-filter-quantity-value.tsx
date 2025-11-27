import React from 'react'
import { injectable } from 'inversify'
import { DynamicTypeFieldFilterAbstractText } from '../../dynamic-type-field-filter-abstract-text'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { ReactElement } from 'react'
import { DynamicTypeFieldFilterQuantityValueComponent, DynamicTypeFieldFilterQuantityValueProps } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-quantity-value-component'
import { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

@injectable()
export class DynamicTypeFieldFilterQuantityValue extends DynamicTypeFieldFilterAbstractText {
  id = 'QuantityValue'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.QuantityValue
  }

  getFieldFilterComponent(props: DynamicTypeFieldFilterQuantityValueProps): ReactElement<DynamicTypeFieldFilterQuantityValueProps> {
    return <DynamicTypeFieldFilterQuantityValueComponent {...props} />
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (value == null || typeof value !== 'object') {
      return false
    }

    return (value.is != null || value.from != null || value.to != null) && value.unitId != null
  }
}

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
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { isNil, isEmpty, isArray } from 'lodash'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

export interface AbstractFieldFilterDefinition {}

export abstract class DynamicTypeFieldFilterAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition>

  shouldOverrideFilterType (): boolean {
    return false
  }

  getFieldFilterType (): string {
    // This method intentionally returns an empty value to avoid duplication in classes that do not override it
    return ''
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (isNil(value) || value === '') {
      return false
    }

    if (isArray(value) && isEmpty(value)) {
      return false
    }

    return true
  }

  isFilterAvailable (subtype: string | null): boolean {
    return true
  }

  transformFilterToApiRequest (filter: FieldFilter): FieldFilter {
    return {
      ...filter,
      key: filter.meta?.filters?.key ?? filter.key,
      type: this.getFieldFilterType()
    }
  }
}

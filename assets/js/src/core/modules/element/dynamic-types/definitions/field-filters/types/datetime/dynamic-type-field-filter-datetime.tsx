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
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterDatetimeComponent, type DynamicTypeFieldFilterDatetimeProps } from '../../components/dynamic-type-field-filter-datetime-component'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeFieldFilterDatetime extends DynamicTypeFieldFilterAbstract {
  id = 'datetime'

  getFieldFilterType (): string {
    return 'system.datetime'
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterDatetimeProps): ReactElement<DynamicTypeFieldFilterDatetimeProps> {
    return (
      <DynamicTypeFieldFilterDatetimeComponent { ...props } />
    )
  }
}

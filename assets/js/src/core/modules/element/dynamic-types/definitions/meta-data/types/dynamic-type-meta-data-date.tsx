/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { inject, injectable } from 'inversify'
import { DynamicTypeMetadataAbstract } from '../dynamic-type-metadata-abstract'
import { DynamicTypeGridCellAbstract } from '../../grid-cell/dynamic-type-grid-cell-abstract'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterAbstract } from '../../field-filters/dynamic-type-field-filter-abstract'
import { formatDate } from '@Pimcore/utils/date-time'
import { isNil } from 'lodash'

@injectable()
export class DynamicTypeMetaDataDate extends DynamicTypeMetadataAbstract {
  readonly id = 'metadata.date'
  readonly iconName = 'calendar'

  visibleInTypeSelection: boolean = true

  @inject(serviceIds['DynamicTypes/GridCell/Date']) protected dynamicTypeGridCellType: DynamicTypeGridCellAbstract
  @inject(serviceIds['DynamicTypes/FieldFilter/Text']) protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract

  getVersionPreviewComponent (data: number | null): JSX.Element {
    if (isNil(data)) {
      return <></>
    }
    return <span>{ formatDate(data) }</span>
  }
}

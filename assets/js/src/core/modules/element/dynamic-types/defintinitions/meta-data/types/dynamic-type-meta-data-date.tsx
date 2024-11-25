/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { inject, injectable } from 'inversify'
import { DynamicTypeMetadataAbstract } from '../dynamic-type-metadata-abstract'
import { DynamicTypeGridCellAbstract } from '../../grid-cell/dynamic-type-grid-cell-abstract'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterAbstract } from '../../field-filters/dynamic-type-field-filter-abstract'

@injectable()
export class DynamicTypeMetaDataDate extends DynamicTypeMetadataAbstract {
  readonly id = 'metadata.date'

  visibleInTypeSelection: boolean = true

  @inject(serviceIds['DynamicTypes/GridCell/Date']) protected dynamicTypeGridCellType: DynamicTypeGridCellAbstract
  @inject(serviceIds['DynamicTypes/FieldFilter/Text']) protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract

  getVersionPreviewComponent (data: { path: string, key: string }): JSX.Element {
    return <span>{ data.path }{ data.key }</span>
  }
}

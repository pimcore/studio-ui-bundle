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
import { ElementTag } from '@Pimcore/components/element-tag/element-tag'
import {
  type ManyToOneRelationValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { isNil, isString } from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

@injectable()
export class DynamicTypeMetaDataObject extends DynamicTypeMetadataAbstract {
  readonly id = 'metadata.object'
  readonly iconName = 'data-object'

  visibleInTypeSelection: boolean = true

  @inject(serviceIds['DynamicTypes/GridCell/ObjectLink']) protected dynamicTypeGridCellType: DynamicTypeGridCellAbstract
  @inject(serviceIds['DynamicTypes/FieldFilter/Text']) protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract

  getVersionPreviewComponent (data: ManyToOneRelationValue | null): JSX.Element {
    if (isNil(data?.fullPath)) {
      return <></>
    }
    return (
      <ElementTag
        { ...data }
        elementType={ isString(data.type) ? mapToElementType(data.type)! : undefined }
        path={ data.fullPath }
      />
    )
  }
}

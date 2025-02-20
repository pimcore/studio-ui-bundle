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

import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { LocalizedFields, type LocalizedFieldsProps } from '../components/localized-fields/localized-fields'
import {
  DynamicTypesList
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'

export class DynamicTypeObjectDataLocalizedFields extends DynamicTypeObjectDataAbstract {
  id: string = DynamicTypesList.LOCALIZED_FIELDS
  isCollectionType: boolean = true

  getObjectDataComponent (props: LocalizedFieldsProps): React.ReactElement<LocalizedFieldsProps> {
    return <LocalizedFields { ...props } />
  }

  getVersionObjectDataComponent (props: LocalizedFieldsProps): React.ReactElement<LocalizedFieldsProps> {
    return (
      <LocalizedFields
        { ...props }
        isVersionObjectDataComponent
      />
    )
  }
}

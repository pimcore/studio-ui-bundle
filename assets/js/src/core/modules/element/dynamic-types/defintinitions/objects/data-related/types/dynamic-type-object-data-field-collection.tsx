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
import { FieldCollection, type FieldCollectionProps } from '../components/field-collection/field-collection'

export class DynamicTypeObjectDataFieldCollection extends DynamicTypeObjectDataAbstract {
  id: string = 'fieldcollections'
  isCollectionType: boolean = true

  getObjectDataComponent (props: FieldCollectionProps): React.ReactElement<FieldCollectionProps> {
    return <FieldCollection { ...props } />
  }
}

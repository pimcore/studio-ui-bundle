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

import {
  type AbstractObjectDataDefinition,
  DynamicTypeObjectDataAbstract
} from '../dynamic-type-object-data-abstract'
import { Block } from '../components/block/block'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/label/field-label'

export class DynamicTypeObjectDataBlock extends DynamicTypeObjectDataAbstract {
  id: string = 'block'
  isCollectionType: boolean = true

  getObjectDataComponent (props: AbstractObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Block
        { ...props }
        className={ props.className }
        title={ <FieldLabel
          label={ props.title }
          name={ props.name }
                /> }
      />
    )
  }
}

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

import type React from 'react'

import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import {
  DynamicTypeObjectDataAbstractSelect, type SelectProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import { toCssDimension } from '@Pimcore/utils/css'

export abstract class DynamicTypeObjectDataAbstractMultiSelect extends DynamicTypeObjectDataAbstractSelect {
  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    return super.getObjectDataComponent({
      ...props,
      multiSelect: true,
      width: toCssDimension(props.width, props.defaultFieldWidth.large)
    })
  }
}

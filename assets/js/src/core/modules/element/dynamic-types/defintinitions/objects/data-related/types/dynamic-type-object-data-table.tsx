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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Table, type TableProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/table/table'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type TableObjectDataDefinition = AbstractObjectDataDefinition & TableProps

export class DynamicTypeObjectDataTable extends DynamicTypeObjectDataAbstract {
  id: string = 'table'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'

  getObjectDataComponent (props: TableObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Table
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }
}

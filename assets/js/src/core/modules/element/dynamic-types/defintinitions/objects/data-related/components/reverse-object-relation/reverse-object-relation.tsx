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
  ManyToManyObjectRelation,
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import type {
  IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import type { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

export interface ReverseObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
  ownerClassName: string | null
}

export interface ReverseObjectRelationProps extends IRelationAllowedTypesDataComponent, ReverseObjectRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
  columnDefinition?: Array<ColumnDef<any>>
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
}

export const ReverseObjectRelation = (props: ReverseObjectRelationProps): React.JSX.Element => {
  if (_.isEmpty(props.ownerClassName)) {
    return <div>Owner class name is missing</div>
  }

  return (
    <ManyToManyObjectRelation
      { ...props }
      allowedClasses={ [String(props.ownerClassName)] }
      dataObjectsAllowed
    />
  )
}

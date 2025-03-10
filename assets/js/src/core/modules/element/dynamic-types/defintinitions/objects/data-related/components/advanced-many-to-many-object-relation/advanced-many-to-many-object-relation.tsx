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

import React, { useEffect } from 'react'
import {
  ManyToManyObjectRelation,
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import _ from 'lodash'
import { Alert } from '@Pimcore/components/alert/alert'
import {
  type AdvancedManyToManyRelationValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import {
  useConvertRelationEditableColumns
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/hooks/use-convert-relation-editable-columns'

export interface AdvancedManyToManyObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  allowMultipleAssignments: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
  allowedClassId: string | null
  columns?: RelationColumnDefinition[] | null
  name: string[]
}

export interface RelationColumnDefinition {
  type?: string
  position: number
  key: string
  label?: string
  width?: number
  value?: string
}

export interface AdvancedManyToManyObjectRelationProps extends AdvancedManyToManyObjectRelationClassDefinitionProps {
  disabled?: boolean
  value?: AdvancedManyToManyRelationValue | null
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  className?: string
}

export const AdvancedManyToManyObjectRelation = (props: AdvancedManyToManyObjectRelationProps): React.JSX.Element => {
  const fieldName = props.name[props.name.length - 1]
  const { columnDefinition, onUpdateCellData, convertToManyToManyRelationValue, convertToAdvancedManyToManyRelationValue } = useConvertRelationEditableColumns(props.columns ?? [], fieldName, props.value, props.onChange)

  useEffect(() => {
  }, [props.value])

  if (_.isEmpty(props.allowedClassId)) {
    return (
      <Alert
        message="Allowed class definition is missing in field configuration."
        type="warning"
      />
    )
  }

  const onChange = (value?: ManyToManyRelationValue | null): void => {
    props.onChange?.(convertToAdvancedManyToManyRelationValue(value))
  }

  return (
    <ManyToManyObjectRelation
      { ...props }
      allowedClasses={ [String(props.allowedClassId)] }
      columnDefinition={ columnDefinition }
      dataObjectsAllowed
      onChange={ onChange }
      onUpdateCellData={ onUpdateCellData }
      value={ convertToManyToManyRelationValue(props.value) }
    />
  )
}

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
import { ManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import { type ColumnDef } from '@tanstack/react-table'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import type {
  IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import {
  enrichRowData,
  visibleFieldsToColumnDefinitions
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-object-relation/utils/column-definition'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'

export interface ManyToManyObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
}

export interface VisibleFieldDefinition {
  name: string
  title: string
  fieldtype: string
  autoWidth?: boolean
}

export interface ManyToManyObjectRelationProps extends IRelationAllowedTypesDataComponent, ManyToManyObjectRelationClassDefinitionProps {
  disabled?: boolean
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
  columnDefinition?: Array<ColumnDef<any>>
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  hint?: React.ReactNode | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
  className?: string
}

export const ManyToManyObjectRelation = (props: ManyToManyObjectRelationProps): React.JSX.Element => {
  const { t } = useTranslation()

  const hasVisibleFieldDefinitions = props.visibleFieldDefinitions !== undefined && !_.isEmpty(props.visibleFieldDefinitions)
  const visibleFieldDefinitions = hasVisibleFieldDefinitions
    ? { ...props.visibleFieldDefinitions }
    : {
        id: {
          name: 'id',
          title: 'id',
          fieldtype: 'input'
        },
        fullpath: {
          name: 'fullpath',
          title: t('relations.reference'),
          fieldtype: 'input'
        },
        classname: {
          name: 'classname',
          title: t('relations.class'),
          fieldtype: 'input'
        }
      }

  for (const key in visibleFieldDefinitions) {
    const field = { ...visibleFieldDefinitions[key] }
    if (key === 'id' || key === 'fullpath' || key === 'classname') {
      if (field.title === t('relations.reference')) {
        continue
      }
      field.title = t(`relations.${key}`)
    } else {
      field.title = t(field.title as string)
    }
    visibleFieldDefinitions[key] = field
  }

  const columnDefinition = visibleFieldsToColumnDefinitions(visibleFieldDefinitions)

  return (
    <ManyToManyRelation
      { ...props }
      columnDefinition={ [...columnDefinition, ...(props.columnDefinition ?? [])] }
      dataObjectsAllowed={ !_.isEmpty(props.allowedClasses) }
      enrichRowData={ (row: ManyToManyRelationValueItem) => enrichRowData(visibleFieldDefinitions, row) }
      // isLoading // todo: set this prop while loading the column definition data
    />
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import {
  type AdvancedManyToManyRelationValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import {
  useConvertRelationEditableColumns
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/hooks/use-convert-relation-editable-columns'
import {
  ManyToManyRelation
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import type {
  IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import {
  getElementCellConfig
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/utils/helpers'
import { Flex } from 'antd'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { LoadingOutlined } from '@ant-design/icons'

export interface AdvancedManyToManyRelationClassDefinitionProps {
  allowToClearRelation: boolean
  allowMultipleAssignments: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
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

export interface AdvancedManyToManyRelationProps extends IRelationAllowedTypesDataComponent, AdvancedManyToManyRelationClassDefinitionProps {
  disabled?: boolean
  inherited?: boolean
  value?: AdvancedManyToManyRelationValue | null
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  className?: string
}

export const AdvancedManyToManyRelation = (props: AdvancedManyToManyRelationProps): React.JSX.Element => {
  const fieldName = props.name[props.name.length - 1]
  const { columnDefinition, onUpdateCellData, convertToManyToManyRelationValue, convertToAdvancedManyToManyRelationValue } = useConvertRelationEditableColumns(props.columns ?? [], fieldName, props.value, props.onChange)
  const { t } = useTranslation()

  useEffect(() => {
  }, [props.value])

  const onChange = (value?: ManyToManyRelationValue | null): void => {
    props.onChange?.(convertToAdvancedManyToManyRelationValue(value))
  }

  const renderFullPathCell = (info: any): React.JSX.Element => {
    return (
      <Flex
        align={ 'center' }
        className={ 'p-mini' }
      >
        <SanitizeHtml html={ info.getValue() ?? '' } />
        {info.row.original.loading !== false ? (<LoadingOutlined style={ { marginLeft: 8 } } />) : null}
      </Flex>
    )
  }

  const addNotEditableColumns = (columnDefinition: Array<ColumnDef<any>>): Array<ColumnDef<any>> => {
    const columnHelper = createColumnHelper()
    return [
      columnHelper.accessor('id', {
        header: t('relations.id'),
        size: 80
      }),
      columnHelper.accessor('fullPath', {
        header: t('relations.reference'),
        meta: {
          type: 'element',
          autoWidth: true,
          editable: false,
          config: getElementCellConfig(props.inherited === true || props.disabled === true)
        },
        size: 200,
        ...(props.pathFormatterClass != null ? { cell: renderFullPathCell } : {})
      }),
      ...columnDefinition,
      columnHelper.accessor('type', {
        header: t('relations.type'),
        meta: {
          type: 'translate'
        },
        size: 150
      }),
      columnHelper.accessor('subtype', {
        header: t('relations.subtype'),
        meta: {
          type: 'translate'
        },
        size: 150
      })
    ]
  }

  return (
    <ManyToManyRelation
      { ...props }
      columnDefinition={ addNotEditableColumns(columnDefinition) }
      dataObjectsAllowed
      onChange={ onChange }
      onUpdateCellData={ onUpdateCellData }
      value={ convertToManyToManyRelationValue(props.value) }
    />
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { ManyToManyRelation, type ManyToManyRelationProps } from '@Pimcore/components/many-to-many-relation'
import { getElementCellConfig } from '@Pimcore/components/many-to-many-relation/utils/helpers'
import { renderFullPathCell } from '@Pimcore/components/many-to-many-relation/utils/full-path-cell-renderer'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { SelectedColumnsProvider } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import {
  hasRelationVisibleFields,
  type RelationVisibleFieldsClassDefinitionProps,
  useRelationVisibleFields
} from './hooks/use-relation-visible-fields'

export type ManyToManyRelationWithVisibleFieldsProps = ManyToManyRelationProps & RelationVisibleFieldsClassDefinitionProps

/** Joins the hint of the field with the loading state of the visible field values. */
export const withVisibleFieldsStatus = (hint: React.ReactNode | null | undefined, status: React.ReactNode | null): React.ReactNode | null | undefined => {
  if (status === null) {
    return hint
  }

  return (
    <>
      { hint }
      <div>{ status }</div>
    </>
  )
}

const ManyToManyRelationVisibleFieldsInner = ({ visibleFields, visibleFieldDefinitions, ...props }: ManyToManyRelationWithVisibleFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const disabled = props.inherited === true || props.disabled === true

  const { columnDefinition: visibleFieldColumns, selectedColumns, enrichRowData, visibleFieldsValue, status, isColumnsLoading } = useRelationVisibleFields({
    visibleFields,
    visibleFieldDefinitions,
    combinedFieldName: props.combinedFieldName,
    value: props.value,
    disabled
  })

  // Passing a column definition replaces the default columns of the relation grid, so they are repeated
  // here with the visible field columns between the reference and the type, as in the advanced relation.
  const columnDefinition = useMemo<Array<ColumnDef<any>>>(() => {
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
          config: getElementCellConfig(disabled)
        },
        size: 200,
        ...(isNonEmptyString(props.pathFormatterClass) ? { cell: renderFullPathCell } : {})
      }),
      ...visibleFieldColumns,
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
    ] as Array<ColumnDef<any>>
  }, [visibleFieldColumns, disabled, props.pathFormatterClass, t])

  return (
    <SelectedColumnsProvider columns={ selectedColumns }>
      <ManyToManyRelation
        { ...props }
        columnDefinition={ columnDefinition }
        enrichRowData={ enrichRowData }
        hint={ withVisibleFieldsStatus(props.hint, status) }
        isLoading={ isColumnsLoading }
        visibleFieldsValue={ visibleFieldsValue }
      />
    </SelectedColumnsProvider>
  )
}

/**
 * The many-to-many relation of the object editor. Without visible fields it is exactly the plain relation
 * grid; with visible fields every configured field the user may see gets a read-only column.
 */
export const ManyToManyRelationWithVisibleFields = ({ visibleFields, visibleFieldDefinitions, ...props }: ManyToManyRelationWithVisibleFieldsProps): React.JSX.Element => {
  if (!hasRelationVisibleFields(visibleFields)) {
    return <ManyToManyRelation { ...props } />
  }

  return (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/MetadataRegistry',
      'DynamicTypes/ListingRegistry'
    ] }
    >
      <ManyToManyRelationVisibleFieldsInner
        { ...props }
        visibleFieldDefinitions={ visibleFieldDefinitions }
        visibleFields={ visibleFields }
      />
    </DynamicTypeRegistryProvider>
  )
}

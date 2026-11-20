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
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { SelectedColumnsProvider } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import {
  AdvancedManyToManyRelation,
  type AdvancedManyToManyRelationProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/advanced-many-to-many-relation/advanced-many-to-many-relation'
import {
  hasRelationVisibleFields,
  type RelationVisibleFieldsClassDefinitionProps,
  useRelationVisibleFields
} from './hooks/use-relation-visible-fields'
import { withVisibleFieldsStatus } from './many-to-many-relation-with-visible-fields'

export type AdvancedManyToManyRelationWithVisibleFieldsProps = AdvancedManyToManyRelationProps & RelationVisibleFieldsClassDefinitionProps & {
  combinedFieldName?: string
}

const AdvancedManyToManyRelationVisibleFieldsInner = ({ visibleFields, visibleFieldDefinitions, ...props }: AdvancedManyToManyRelationWithVisibleFieldsProps): React.JSX.Element => {
  // the related elements of the rows, which is all the visible field values are loaded for
  const relatedElements = useMemo<ManyToManyRelationValue | null>(
    () => props.value?.map((item) => ({ ...item.element })) ?? null,
    [props.value]
  )

  const { columnDefinition, selectedColumns, enrichRowData, visibleFieldsValue, status, isColumnsLoading } = useRelationVisibleFields({
    visibleFields,
    visibleFieldDefinitions,
    combinedFieldName: props.combinedFieldName,
    value: relatedElements,
    disabled: props.inherited === true || props.disabled === true
  })

  // The visible field columns are read-only and read their values from the visible field values of the
  // row, never from the row's metadata: a metadata column and a visible field may share a name.
  return (
    <SelectedColumnsProvider columns={ selectedColumns }>
      <AdvancedManyToManyRelation
        { ...props }
        additionalColumns={ columnDefinition }
        enrichRowData={ enrichRowData }
        hint={ withVisibleFieldsStatus(props.hint, status) }
        isLoading={ isColumnsLoading }
        visibleFieldsValue={ visibleFieldsValue }
      />
    </SelectedColumnsProvider>
  )
}

/**
 * The advanced many-to-many relation of the object editor. Without visible fields it is exactly the plain
 * relation grid; with visible fields every configured field the user may see gets a read-only column next
 * to the metadata columns.
 */
export const AdvancedManyToManyRelationWithVisibleFields = ({ visibleFields, visibleFieldDefinitions, ...props }: AdvancedManyToManyRelationWithVisibleFieldsProps): React.JSX.Element => {
  if (!hasRelationVisibleFields(visibleFields)) {
    return <AdvancedManyToManyRelation { ...props } />
  }

  return (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/MetadataRegistry',
      'DynamicTypes/ListingRegistry'
    ] }
    >
      <AdvancedManyToManyRelationVisibleFieldsInner
        { ...props }
        visibleFieldDefinitions={ visibleFieldDefinitions }
        visibleFields={ visibleFields }
      />
    </DynamicTypeRegistryProvider>
  )
}

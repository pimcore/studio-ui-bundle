/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { isEqual, isNil } from 'lodash'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { ManyToManyRelationGrid } from './grid'
import { type ManyToManyRelationValue, type ManyToManyRelationValueItem, type DisplayManyToManyRelationValue, useValue } from './hooks/use-value'
import type { DragAndDropInfo } from '@sdk/components'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { ManyToManyRelationToolbar } from './components/toolbar/toolbar'
import { dndIsValidData, type IRelationAllowedTypesDataComponent } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { toCssDimension } from '@Pimcore/utils/css'
import { Content } from '@Pimcore/components/content/content'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { useFilterQuery } from '@Pimcore/components/filters'
import { relationFilterAdapter, useRelationFilters } from './filters/filters'
import { useRelationFilterColumns } from '@Pimcore/components/many-to-many-relation/filters'
import { RelationFiltersProvider } from './filters/provider/relation-filters-provider'

export interface ManyToManyRelationClassDefinitionProps {
  assetUploadPath?: string | null
  allowToClearRelation: boolean
  /** Object relations only: offers a toolbar action that creates a new object into the relation. */
  allowToCreateNewObject?: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  assetInlineDownloadAllowed?: boolean | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
  hideOpenButton?: boolean
}

export interface ManyToManyRelationProps extends IRelationAllowedTypesDataComponent, ManyToManyRelationClassDefinitionProps {
  combinedFieldName?: string
  disabled?: boolean
  inherited?: boolean
  value?: ManyToManyRelationValue | null
  visibleFieldsValue?: Array<Record<string, any> | undefined>
  onChange?: (value?: ManyToManyRelationValue | null) => void
  isLoading?: boolean
  columnDefinition?: Array<ColumnDef<any>>
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  hint?: React.ReactNode | null
  allowMultipleAssignments?: boolean
  className?: string
  disableInlineUpload?: boolean
  enableRowDrag?: boolean
  noteditable?: boolean | null
  /** Renders a filter dropdown in the header of every filterable column. */
  enableColumnFilters?: boolean
}

interface ManyToManyRelationContentProps extends ManyToManyRelationProps {
  enableRowDrag: boolean
}

const ManyToManyRelationContent = ({ enableRowDrag, ...props }: ManyToManyRelationContentProps): React.JSX.Element => {
  const [value, setValue] = useState<ManyToManyRelationValue | null>(props.value ?? null)
  const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>(props.value ?? null)

  const { values: appliedFilters } = useRelationFilters()
  const { columns: filterableColumns } = useRelationFilterColumns()
  const buildFilterQuery = useFilterQuery(relationFilterAdapter, appliedFilters)
  const { matchRow } = buildFilterQuery({})

  const { onDrop, deleteItem, onSearch, onOrderChange, addAssets, addItems, updateDisplayValue, maxRemainingItems, getOriginalIndex, hasActiveSearch } = useValue(
    value, setValue, displayedValue, setDisplayedValue, props.maxItems, props.allowMultipleAssignments, { name: props.combinedFieldName, class: props.pathFormatterClass ?? undefined }, props?.visibleFieldsValue, matchRow
  )
  const allowDragAndDrop = !isNil(displayedValue) && displayedValue?.length > 1 && !hasActiveSearch && !props?.noteditable

  // Wrapper for onUpdateCellData that maps displayed row index to original index
  const handleUpdateCellData = (event: OnUpdateCellDataEvent): void => {
    if (props.onUpdateCellData === undefined) return

    const originalIndex = getOriginalIndex(event.rowIndex)
    const eventWithOriginalIndex = { ...event, rowIndex: originalIndex }
    props.onUpdateCellData(eventWithOriginalIndex)
  }

  useEffect(() => {
    if (!isEqual(value, props.value ?? null)) {
      props.onChange?.(value)
    }
  }, [value])

  useEffect(() => {
    if (!isEqual(value, props.value)) {
      setValue(props.value ?? null)
      updateDisplayValue(props.value ?? null)
    }
  }, [props.value])

  const hasAppliedFiltersOnce = useRef<boolean>(false)

  /**
   * What the rows are matched against is not only the applied filter values: a
   * filterable column that is gone - or filtering that got disabled altogether -
   * drops its matcher, and refreshed visible field data changes the values the
   * matchers and the search read. All of them have to refresh the rows, or the
   * grid keeps showing what the previous context matched.
   *
   * Serialized on purpose: the hosts build the column definition and the visible
   * fields anew on every render, so depending on their identity would refresh the
   * rows in a loop.
   */
  const filterContextKey = useMemo(() => JSON.stringify({
    filters: appliedFilters,
    columns: filterableColumns.map((column) => column.key),
    visibleFields: props.visibleFieldsValue
  }), [appliedFilters, filterableColumns, props.visibleFieldsValue])

  useEffect(() => {
    if (!hasAppliedFiltersOnce.current) {
      hasAppliedFiltersOnce.current = true
      return
    }

    updateDisplayValue(value)
  }, [filterContextKey])

  if (props.isLoading === true) {
    return (
      <Content
        loading
        style={ {
          width: toCssDimension(props.width),
          height: toCssDimension(props.height)
        } }
      />
    )
  }

  return (
    <>
      <Droppable
        disableDndActiveIndicator
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && isValidElementType(info.type) }
        isValidData={ (info: DragAndDropInfo) => dndIsValidData(info, props) }
        onDrop={ onDrop }
        variant="outline"
      >
        <ManyToManyRelationGrid
          assetInlineDownloadAllowed={ props.assetInlineDownloadAllowed ?? false }
          className={ props.className }
          columnDefinition={ props.columnDefinition }
          deleteItem={ deleteItem }
          disabled={ props.disabled }
          enableRowDrag={ enableRowDrag && allowDragAndDrop }
          enableRowVirtualizer={ !props.noteditable }
          enrichRowData={ props.enrichRowData }
          handleOrderChange={ onOrderChange }
          height={ props.height }
          hideOpenButton={ props.hideOpenButton }
          hint={ props.hint }
          inherited={ props.inherited }
          onUpdateCellData={ handleUpdateCellData }
          pathFormatterConfig={ { name: props.combinedFieldName, class: props.pathFormatterClass ?? undefined } }
          value={ displayedValue }
          width={ props.width }
        />
      </Droppable>
      <Content
        style={ {
          width: toCssDimension(props.width)
        } }
      >
        <ManyToManyRelationToolbar
          { ...props }
          addAssets={ addAssets }
          addItems={ addItems }
          allowClear={ props.allowToClearRelation && props.disabled !== true }
          assetUploadPath={ props.assetUploadPath }
          disabled={ props.disabled }
          empty={ () => {
            updateDisplayValue(null)
            setValue(null)
          } }
          enableUpload={ props.assetsAllowed === true && props.disabled !== true && props.disableInlineUpload !== true }
          itemLimitReached={ maxRemainingItems !== undefined && maxRemainingItems <= 0 }
          onSearch={ onSearch }
          uploadMaxItems={ maxRemainingItems !== undefined && maxRemainingItems > 0 ? maxRemainingItems : (props.maxItems ?? undefined) }
          uploadShowMaxItemsError={ maxRemainingItems !== undefined && maxRemainingItems <= 0 }
        />
      </Content>
    </>
  )
}

export const ManyToManyRelation = ({ enableRowDrag = true, enableColumnFilters = true, ...props }: ManyToManyRelationProps): React.JSX.Element => {
  return (
    <RelationFiltersProvider
      columnDefinition={ props.columnDefinition }
      enabled={ enableColumnFilters }
      visibleFieldsValue={ props.visibleFieldsValue }
    >
      <ManyToManyRelationContent
        { ...props }
        enableRowDrag={ enableRowDrag }
      />
    </RelationFiltersProvider>
  )
}

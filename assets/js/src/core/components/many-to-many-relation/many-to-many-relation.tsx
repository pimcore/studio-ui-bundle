/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
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

export interface ManyToManyRelationClassDefinitionProps {
  assetUploadPath?: string | null
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  assetInlineDownloadAllowed?: boolean | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
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
}

export const ManyToManyRelation = ({ enableRowDrag = true, ...props }: ManyToManyRelationProps): React.JSX.Element => {
  const [value, setValue] = useState<ManyToManyRelationValue | null>(props.value ?? null)
  const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>(props.value ?? null)

  const { onDrop, deleteItem, onSearch, onOrderChange, addAssets, addItems, updateDisplayValue, maxRemainingItems, getOriginalIndex, hasActiveSearch } = useValue(
    value, setValue, displayedValue, setDisplayedValue, props.maxItems, props.allowMultipleAssignments, { name: props.combinedFieldName, class: props.pathFormatterClass ?? undefined }, props?.visibleFieldsValue
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
          onSearch={ onSearch }
          uploadMaxItems={ maxRemainingItems !== undefined && maxRemainingItems > 0 ? maxRemainingItems : (props.maxItems ?? undefined) }
          uploadShowMaxItemsError={ maxRemainingItems !== undefined && maxRemainingItems <= 0 }
        />
      </Content>
    </>
  )
}

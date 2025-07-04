/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject, useEffect, useState, useMemo } from 'react'
import { isEqual, isNil } from 'lodash'
import cn from 'classnames'
import { arrayMove } from '@dnd-kit/sortable'
import { type DragEndEvent } from '@dnd-kit/core'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Grid } from '@Pimcore/components/grid/grid'
import { type ColumnDef } from '@tanstack/react-table'
import { type ManyToManyRelationValue, type ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { toCssDimension } from '@Pimcore/utils/css'
import { Content } from '@Pimcore/components/content/content'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { useColumns } from './hooks/use-columns'

export interface ManyToManyRelationGridProps {
    value?: ManyToManyRelationValue | null
    deleteItem: (rowIndex: number) => void
    assetInlineDownloadAllowed: boolean
    disabled?: boolean
    inherited?: boolean
    width: number | string | null
    height: number | string | null
    enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
    columnDefinition?: Array<ColumnDef<any>>
    hint?: React.ReactNode | null
    onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
    className?: string
    enableRowDrag: boolean
    handleOrderChange: (data: ManyToManyRelationValue) => void
}

export const ManyToManyRelationGrid = forwardRef(function ManyToManyRelationGrid (props: ManyToManyRelationGridProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
    const { getStateClasses } = useDroppable()
    const { mapToElementType } = useElementHelper()
    const { columns } = useColumns(props)

    const [data, setData] = useState(getDataArray())

    useEffect(() => {
        setData(getDataArray())
    }, [props.value])

    function getDataArray (): ManyToManyRelationValue {
        const result = props.value ?? []

        return result.map((item: ManyToManyRelationValueItem) => {
            const elementType = mapToElementType(item.type)
            const resultRow = { ...item, type: elementType ?? '' }

            if (props.enrichRowData !== undefined) {
                return props.enrichRowData(resultRow)
            }

            return resultRow
        })
    }

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event

        if (!isNil(active) && !isNil(over) && !isEqual(active.id, over.id)) {
            setData(prev => {
                const oldIndex = prev.findIndex(row => row.id === active.id)
                const newIndex = prev.findIndex(row => row.id === over.id)

                if (oldIndex === -1 || newIndex === -1) return prev

                const reorderedData = arrayMove(prev, oldIndex, newIndex)

                props.handleOrderChange(reorderedData)

                return reorderedData
            })
        }
    }

    const content = useMemo(() => (
        <Content
            style={ {
                width: toCssDimension(props.width),
                height: toCssDimension(props.height)
            } }
        >
            <div style={ { maxWidth: 'calc(100% - 2px)' } }>
                <Grid
                    autoWidth
                    className={ props.className }
                    columns={ columns }
                    data={ data }
                    disabled={ props.disabled === true || props.inherited === true }
                    enableRowDrag={ props.enableRowDrag }
                    handleDragEnd={ handleDragEnd }
                    onUpdateCellData={ props.onUpdateCellData }
                    resizable
                    setRowId={ (originalRow) => originalRow.id }
                />
                {props.hint}
            </div>
        </Content>
    ), [props])

    return (
        <div
            className={ cn(...getStateClasses()) }
            ref={ ref }
        >
            {content}
        </div>
    )
})
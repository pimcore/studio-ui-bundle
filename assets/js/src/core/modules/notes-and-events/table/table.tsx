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

import React, { useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type DataNote } from '@Pimcore/modules/notes-and-events/hooks/use-global-notes-and-events'
import {
  type Note
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { uuid } from '@Pimcore/utils/uuid'
import { Flex } from '@Pimcore/components/flex/flex'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { isEmpty, isUndefined } from 'lodash'
import { NoteModal } from '@Pimcore/modules/notes-and-events/note-modal'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { type ElementInfo } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/element-cell/element-cell'
import { formatDateTime } from '@Pimcore/utils/date-time'

type DataNoteWithActions = DataNote & {
  actions: React.ReactNode
  dateFormatted: string
}

export interface TableProps {
  notesAndEvents: Note[]
  notesAndEventsFetching: boolean
}

export const Table = ({ notesAndEvents, notesAndEventsFetching }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { openElement, mapToElementType } = useElementHelper()

  const [notes, setNotes] = useState<DataNote[]>([])
  const [noteDetail, setNoteDetail] = useState<DataNote | undefined>(undefined)

  useEffect(() => {
    if (notesAndEvents !== undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  const enrichNotesAndEvents = (data: Note[]): DataNote[] =>
    data.map((item) => ({
      ...item,
      fields: item.data.length,
      rowId: uuid(),
      dateFormatted: formatDateTime({ timestamp: item.date, dateStyle: 'short', timeStyle: 'short' })
    })
    )

  const columnHelper = createColumnHelper<DataNoteWithActions>()
  const createColumns = (): any => [
    columnHelper.accessor('type', {
      header: t('notes-and-events.columns.type'),
      size: 100
    }),
    columnHelper.accessor(row => ({ path: row.cPath, elementType: row.cType, id: row.cId }), {
      id: 'element',
      header: t('notes-and-events.columns.element'),
      meta: {
        editable: false,
        type: 'element',
        config: {
          getElementInfo: (cellProps: DefaultCellProps): ElementInfo => {
            const row = cellProps.row.original
            return {
              elementType: mapToElementType(String(row.cType), true),
              id: row.cId,
              fullPath: isEmpty(row.cPath) ? false : decodeURIComponent(String(row.cPath))
            }
          }
        }
      },
      size: 300
    }),
    columnHelper.accessor('title', {
      header: t('notes-and-events.columns.title'),
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('notes-and-events.columns.description'),
      meta: {
        autoWidth: true
      }
    }),
    columnHelper.accessor('fields', {
      header: t('notes-and-events.columns.details'),
      size: 70
    }),
    columnHelper.accessor('userName', {
      header: t('notes-and-events.columns.user'),
      size: 120
    }),
    columnHelper.accessor('dateFormatted', {
      header: t('notes-and-events.columns.date'),
      size: 120
    }),
    columnHelper.accessor('actions', {
      header: t('notes-and-events.columns.actions'),
      size: 70,
      cell: (info) => {
        const row: { path: string, elementType: string, id: number } = info.row.getValue('element')
        const elementType = mapToElementType(row.elementType, true)
        const elementId = row.id

        return (!isUndefined(row.path) && row.path !== '')
          ? (
            <Flex
              align='center'
              className='w-full'
            >
              <IconButton
                icon={ { value: 'open-folder' } }
                onClick={ async () => {
                  !isUndefined(elementType) &&
                                    await openElement({
                                      type: elementType,
                                      id: elementId
                                    })
                } }
                type="link"
              />
              <IconButton
                icon={ { value: 'show-details' } }
                onClick={ async () => {
                  setNoteDetail(info.row.original)
                } }
                type="link"
              />
            </Flex>
            )
          : (
            <Flex
              align='center'
              className='w-full'
            >
              <IconButton
                icon={ { value: 'show-details' } }
                onClick={ async () => {
                  setNoteDetail(info.row.original)
                } }
                type="link"
              />
            </Flex>
            )
      }
    })
  ]

  const tableData = createColumns()

  return (
    <div className={ styles.table }>
      {noteDetail !== undefined && (
        <NoteModal
          noteDetail={ noteDetail }
          setNoteDetail={ setNoteDetail }
        />
      )}
      <Grid
        autoWidth
        columns={ tableData }
        data={ notes }
        isLoading={ notesAndEventsFetching }
        modifiedCells={ [] }
        resizable
        setRowId={ (row: DataNote) => row.rowId }
      />
    </div>
  )
}

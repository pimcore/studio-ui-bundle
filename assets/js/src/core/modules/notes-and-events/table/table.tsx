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
import { type DataNote, useNotesAndEvents } from '@Pimcore/modules/notes-and-events/hooks/use-global-notes-and-events'
import {
  type Note
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { uuid } from '@Pimcore/utils/uuid'
import { Flex } from '@Pimcore/components/flex/flex'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { isUndefined } from 'lodash'

type DataNoteWithActions = DataNote & {
  actions: React.ReactNode
}

export const Table = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { notesAndEvents, notesAndEventsLoading } = useNotesAndEvents()
  const { openElement, mapToElementType } = useElementHelper()

  const [notes, setNotes] = useState<DataNote[]>([])

  useEffect(() => {
    if (notesAndEvents !== undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  const enrichNotesAndEvents = (data: Note[]): DataNote[] => {
    return data.map((item) => {
      return {
        ...item,
        fields: item.data.length,
        rowId: uuid()
      }
    })
  }

  useEffect(() => {
    if (notesAndEvents !== undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  const columnHelper = createColumnHelper<DataNoteWithActions>()
  const createColumns = (): any => [
    columnHelper.accessor('type', {
      header: t('notes-and-events.columns.type'),
      size: 70
    }),
    columnHelper.accessor(row => ({ path: row.cPath, elementType: row.cType, id: row.cId }), {
      id: 'element',
      header: t('notes-and-events.columns.element'),
      size: 200,
      cell: (info) => {
        const { path, id } = info.getValue()
        return (
          <div
            key={ id }
          > {path} </div>
        )
      }
    }),
    columnHelper.accessor('cPath', {
      header: t('notes-and-events.columns.element'),
      size: 200,
      meta: {
        type: 'element-cell'
      }
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
      header: t('notes-and-events.columns.fields'),
      size: 70
    }),
    columnHelper.accessor('userName', {
      header: t('notes-and-events.columns.user'),
      size: 70
    }),
    columnHelper.accessor('date', {
      header: t('notes-and-events.columns.date'),
      size: 70,
      meta: {
        type: 'date'
      }
    }),
    columnHelper.accessor('actions', {
      header: t('notes-and-events.columns.actions'),
      size: 70,
      cell: (info) => {
        const row: { path: string, elementType: string, id: number } = info.row.getValue('element')
        const elementType = mapToElementType(row.elementType)
        const elementId = row.id

        return (
          <Flex
            align='center'
            className='w-full'
            justify='center'
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
                alert('open')
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
      <Grid
        autoWidth
        columns={ tableData }
        data={ notes }
        isLoading={ notesAndEventsLoading }
        modifiedCells={ [] }
        resizable
        setRowId={ (row: DataNote) => row.rowId }
      />
    </div>
  )
}

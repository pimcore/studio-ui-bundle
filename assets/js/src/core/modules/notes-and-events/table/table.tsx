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

type DataNoteWithActions = DataNote & {
  actions: React.ReactNode
}

export const Table = (): React.JSX.Element => {
  console.log('----> here')

  const { t } = useTranslation()
  const { styles } = useStyles()
  const { notesAndEvents, notesAndEventsLoading } = useNotesAndEvents()

  console.log('----> notesAndEvents', notesAndEvents)
  console.log('----> notesAndEventsLoading', notesAndEventsLoading)

  // const areNotesAndEventsAvailable = notesAndEvents !== undefined && notesAndEvents.length > 0

  const [notes, setNotes] = useState<DataNote[]>([])

  console.log('----> notes', notes)
  // const modifiedCellsType = 'notes-and-events'
  const modifiedCells = []

  useEffect(() => {
    console.log('----> too often?')

    if (notesAndEvents !== undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  const enrichNotesAndEvents = (data: Note[]): DataNote[] => {
    return data.map((item) => {
      return {
        ...item,
        element: `${item.cType} + ${item.cPath}`,
        rowId: uuid()
      }
    })
  }

  useEffect(() => {
    if (notesAndEvents !== undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])
  //
  // useEffect(() => {
  //   if (areNotesAndEventsAvailable) {
  //     setGridDataOwn(enrichNotesAndEvents(notesAndEvents))
  //   }
  // }, [notesAndEvents])

  const columnHelper = createColumnHelper<DataNoteWithActions>()
  const createColumns = (): any => [
    columnHelper.accessor('type', {
      header: t('notes-and-events.columns.type'),
      meta: {
        editable: false
      },
      size: 40
    }),
    columnHelper.accessor('element', {
      header: t('notes-and-events.columns.element'),
      meta: {
        editable: true
      },
      size: 200
    }),
    columnHelper.accessor('title', {
      header: t('notes-and-events.columns.title'),
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('notes-and-events.columns.description'),
      size: 200
    }),
    columnHelper.accessor('additionalAttributes', {
      header: t('notes-and-events.columns.fields'),
      meta: {
        editable: false,
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('userName', {
      header: t('notes-and-events.columns.user'),
      size: 70,
      meta: {
        editable: false,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('date', {
      header: t('notes-and-events.columns.date'),
      size: 70,
      meta: {
        editable: false,
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('actions', {
      header: t('notes-and-events.columns.actions'),
      size: 70,
      cell: (info) => {
        return (
          <div className={ 'global-notes-table--actions-column' }>
            {
              (
                <IconButton
                  icon={ { value: 'group' } }
                  onClick={ async () => {
                    // !isUndefined(typeValue) && await openElement({
                    //   type: typeValue,
                    //   id: 339
                    // })
                    alert('HI')
                  } }
                  type="link"
                />
              )
            }
          </div>
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
        modifiedCells={ modifiedCells }
        onUpdateCellData={ () => { alert('') } }
        resizable
        setRowId={ (row: DataNote) => row.rowId }
      />
    </div>
  )
}

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
import { isUndefined } from 'lodash'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { uuid } from '@Pimcore/utils/uuid'
import { type Note } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { type DataNote, useNotesAndEvents } from '@Pimcore/modules/notes-and-events/hooks/use-global-notes-and-events'

interface ITableProps {
  notesAndEvents: Note[]
}

type DataNoteWithActions = DataNote & {
  actions: React.ReactNode
}

export const Table = ({
  notesAndEvents
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement, mapToElementType } = useElementHelper()
  const { styles } = useStyles()
  const { notesAndEventsLoading } = useNotesAndEvents()

  const { id, elementType } = useElementContext()
  const { element, setModifiedCells } = useElementDraft(id, elementType)
  const areNotesAndEventsAvailable = notesAndEvents !== undefined && notesAndEvents.length > 0

  const [gridDataOwn, setGridDataOwn] = useState<DataNote[]>([])
  const [notes, setNotes] = useState<DataNote[]>([])
  const modifiedCellsType = 'notes-and-events'
  const modifiedCells = element?.modifiedCells[modifiedCellsType] ?? []

  console.log('----> notes', notes)

  const enrichNotesAndEvents = (data: Note[]): DataNote[] => {
    return data.map((item) => {
      return {
        ...item,
        rowId: uuid()
      }
    })
  }

  useEffect(() => {
    if (notesAndEvents !== undefined && element?.changes.properties === undefined && Array.isArray(notesAndEvents)) {
      setNotes(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  useEffect(() => {
    if (areNotesAndEventsAvailable) {
      setGridDataOwn(enrichNotesAndEvents(notesAndEvents))
    }
  }, [notesAndEvents])

  useEffect(() => {
    if (modifiedCells.length > 0 && element?.changes.properties === undefined) {
      setModifiedCells(modifiedCellsType, [])
    }
  }, [element, modifiedCells])

  const columnHelper = createColumnHelper<DataNoteWithActions>()
  const createColumns = (): any => [
    columnHelper.accessor('type', {
      header: t('notes-and-events.columns.type'),
      meta: {
        editable: false
      },
      size: 40
    }),
    columnHelper.accessor('title', {
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
    columnHelper.accessor('data', {
      header: t('notes-and-events.columns.fields'),
      meta: {
        editable: false,
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('title', {
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
              ['document', 'asset', 'object'].includes(info.row.original.type) &&
                info.row.original.data !== null &&
              (
                <IconButton
                  icon={ { value: 'group' } }
                  onClick={ async () => {
                    const typeValue = mapToElementType(info.row.original.type)

                    !isUndefined(typeValue) && await openElement({
                      type: typeValue,
                      id: 339
                    })
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

  return (
    <div className={ styles.table }>
      {(
        <>
          {(
            <Grid
              autoWidth
              columns={ createColumns() }
              data={ gridDataOwn }
              isLoading={ notesAndEventsLoading }
              modifiedCells={ modifiedCells }
              onUpdateCellData={ () => { alert('') } }
              resizable
              setRowId={ (row: DataProperty) => row.rowId }
            />
          )}
        </>
      )}
    </div>
  )
}

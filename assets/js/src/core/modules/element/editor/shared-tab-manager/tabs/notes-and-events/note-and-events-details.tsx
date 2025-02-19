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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import type {
  Note
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'

interface NoteAndEventDetailsProps {
  note: Note
}

interface NoteDataEntry {
  name: string | null
  type: string | null
  value?: string | React.JSX.Element | null
}

export const NoteAndEventDetails = ({ note }: NoteAndEventDetailsProps): React.JSX.Element => {
  const { t } = useTranslation()

  const formatedData: NoteDataEntry[] = []
  const transformData = (noteData: any): void => {
    if (typeof noteData !== 'object' || !('data' in noteData)) {
      return
    }
    const tempData: NoteDataEntry = {
      name: (noteData as NoteDataEntry).name,
      type: (noteData as NoteDataEntry).type,
      value: ''
    }
    if (typeof noteData.data === 'object' && noteData.data !== null && ('path' in noteData.data)) {
      tempData.value = String(noteData.data.path)
    } else if (typeof noteData.data === 'string') {
      tempData.value = noteData.data
    } else {
      tempData.value = respectLineBreak(noteData.data as string)
    }
    formatedData.push(tempData)
  }

  note.data.forEach((noteData) => {
    transformData(noteData)
  })

  const columnHelper = createColumnHelper<any>()

  const columns = [
    columnHelper.accessor('name', { header: t('notes-and-events.name') }),
    columnHelper.accessor('type', { header: t('notes-and-events.type'), size: 120 }),
    columnHelper.accessor('value', { header: t('notes-and-events.value'), size: 310, meta: { autoWidth: true } })
  ]

  return (
    <div>
      <span className={ 'panel-body__details' }>{t('notes-and-events.details')}</span>
      <Grid
        autoWidth
        columns={ columns }
        data={ formatedData }
        resizable
      />
    </div>
  )
}

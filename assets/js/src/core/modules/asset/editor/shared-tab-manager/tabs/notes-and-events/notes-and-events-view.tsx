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
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-view.style'
import { Button } from 'antd'
import {
  type Note
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import { NoteAndEventCard } from '@Pimcore/components/note-and-event-card/note-and-event-card'
import { formatDateTime } from '@Pimcore/utils/helpers'

interface NotesAndEventsTabViewProps {
  notes: Note[]
  pagination: React.JSX.Element
  onClickTrash: (id: number) => void
}
export const NotesAndEventsTabView = ({
  notes,
  pagination,
  onClickTrash
}: NotesAndEventsTabViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const NotesAndEvents = notes.map((note) => {
    const formatedData: any[] = []
    if (Array.isArray(note.data)) {
      note.data.forEach((noteData) => {
        const tempData = structuredClone(noteData)
        if (typeof tempData.data === 'object') {
          tempData[t('notes-and-events.value')] = tempData.data.path
        } else {
          tempData[t('notes-and-events.value')] = tempData.data
        }
        delete tempData.data
        formatedData.push(tempData)
      })
    } else {
      // TODO
    }

    return (
      <NoteAndEventCard
        className={ 'notes-card' }
        data={ formatedData }
        date={ formatDateTime(note.date) }
        description={ note.description }
        key={ note.id }
        onClickTrash={ () => { onClickTrash(note.id) } }
        title={ note.title }
        type={ note.type }
      />
    )
  })

  return (
    <div className={ styles['notes-and-events'] }>
      <div className={ 'notes-container' }>
        <div className={ 'notes-container__header' }>
          <span className={ 'notes-container__text' }>{t('notes-and-events.notes-and-events')}</span>
          <Button
            icon={ <Icon
              name={ 'PlusCircleOutlined' }
              options={ { width: '24px', height: '24px' } }
                   /> }
          >
            { t('add') }
          </Button>
        </div>
        <div className={ 'notes-container__details' }>
          {NotesAndEvents}
        </div>
        {pagination}
      </div>
      <div>

      </div>
    </div>
  )
}

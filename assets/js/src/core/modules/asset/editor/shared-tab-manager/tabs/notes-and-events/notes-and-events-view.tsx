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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useStyles
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-view.style'
import { Button } from 'antd'
import {
  type Note
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { Icon } from '@Pimcore/components/icon/icon'
import { NoteAndEventCard } from '@Pimcore/components/note-and-event-card/note-and-event-card'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import {
  AddNoteModal
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/modal/add-note-modal'

interface NotesAndEventsTabViewProps {
  notes: Note[]
  pagination: React.JSX.Element
  onClickTrash: (id: number) => void
  elementType: 'asset' | 'document' | 'data-object'
  elementId: number
}
export const NotesAndEventsTabView = ({
  notes,
  pagination,
  onClickTrash,
  elementId,
  elementType
}: NotesAndEventsTabViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [addNoteModalOpen, setAddNoteModalOpen] = useState<boolean>(false)

  const NotesAndEvents = notes.map((note) => {
    let showDetails = false
    const formatedData: any[] = []
    if (Array.isArray(note.data) && note.data.length > 0) {
      showDetails = true
      note.data.forEach((noteData) => {
        const tempData = structuredClone(noteData)
        if (typeof tempData.data === 'object') {
          tempData[t('notes-and-events.value')] = tempData.data.path
        } else {
          tempData[t('notes-and-events.value')] = respectLineBreak(tempData.data as string)
        }
        delete tempData.data
        formatedData.push(tempData)
      })
    }

    return (
      <NoteAndEventCard
        className={ 'notes-card' }
        data={ formatedData }
        date={ formatDateTime({ timestamp: note.date, dateStyle: 'short', timeStyle: 'medium' }) }
        description={ note.description }
        key={ note.id }
        onClickTrash={ () => { onClickTrash(note.id) } }
        showDetails={ showDetails }
        title={ note.title }
        type={ note.type !== '' ? t(`notes-and-events.${note.type}`) : undefined }
        user={ note.userName }
      />
    )
  })

  return (
    <div className={ styles['notes-and-events'] }>
      <div className={ 'notes-container' }>
        <div className={ 'notes-content' }>
          <div className={ 'notes-content__header' }>
            <span className={ 'notes-content__text' }>{t('notes-and-events.notes-and-events')}</span>
            <Button
              icon={ <Icon
                name={ 'PlusCircleOutlined' }
                options={ { width: '24px', height: '24px' } }
                     /> }
              onClick={ () => { setAddNoteModalOpen(true) } }
            >
              {t('add')}
            </Button>
            <AddNoteModal
              elementId={ elementId }
              elementType={ elementType }
              open={ addNoteModalOpen }
              setOpen={ setAddNoteModalOpen }
            />
          </div>
          {notes.length > 0
            ? (
              <div className={ 'notes-content__details' }>
                {NotesAndEvents}
              </div>
              )
            : (
              <div className={ 'notes-content__empty-container' }>
                <NoContent text={ t('notes-and-events.no-notes-and-events-to-show') } />
              </div>
              )
          }
        </div>
        <div className={ 'notes-container__pagination-container' }>
          <div className={ 'notes-container__pagination' }>
            <div />
            {pagination}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

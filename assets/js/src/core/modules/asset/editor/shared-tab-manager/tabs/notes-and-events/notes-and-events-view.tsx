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
  type Note
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { NoteAndEventCard } from '@Pimcore/components/note-and-event-card/note-and-event-card'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { AddNoteModal } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/modal/add-note-modal'
import { type ElementType } from 'types/element-type.d'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'

interface NotesAndEventsTabViewProps {
  notes: Note[]
  pagination: React.JSX.Element
  onClickTrash: (id: number) => void
  elementType: ElementType
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
        data={ formatedData }
        date={ formatDateTime({ timestamp: note.date, dateStyle: 'short', timeStyle: 'medium' }) }
        description={ note.description }
        key={ note.id }
        onClickTrash={ () => {
          onClickTrash(note.id)
        } }
        showDetails={ showDetails }
        title={ note.title }
        type={ note.type !== '' ? t(`notes-and-events.${note.type}`) : undefined }
        user={ note.userName }
      />
    )
  })

  return (
    <ContentToolbarSidebarLayout
      renderToolbar={ notes.length !== 0
        ? (
          <Toolbar
            justify='flex-end'
            theme='secondary'
          >
            <>
              { pagination }
            </>
          </Toolbar>
          )
        : undefined }
    >
      <Content
        padded
      >
        <Header
          title={ t('notes-and-events.notes-and-events') }
        >
          <IconTextButton
            icon={ 'PlusCircleOutlined' }
            iconOptions={ { width: '24px', height: '24px' } }
            onClick={ () => {
              setAddNoteModalOpen(true)
            } }
          >
            {t('add')}
          </IconTextButton>

          <AddNoteModal
            elementId={ elementId }
            elementType={ elementType }
            open={ addNoteModalOpen }
            setOpen={ setAddNoteModalOpen }
          />
        </Header>

        <Content
          none={ notes.length === 0 }
          noneOptions={ {
            text: t('notes-and-events.no-notes-and-events-to-show')
          } }
        >
          {NotesAndEvents}
        </Content>
      </Content>
    </ContentToolbarSidebarLayout>
  )
}

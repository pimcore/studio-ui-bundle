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
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import {
  AddNoteModal
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/modal/add-note-modal'
import { type ElementType } from '../../../../../../types/enums/element/element-type'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tag } from 'antd'
import { Space } from '@Pimcore/components/space/space'
import i18n from 'i18next'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import { Split } from '@Pimcore/components/split/split'
import { Paragraph } from '@Pimcore/components/paragraph/paragraph'
import { Collapse } from '@Pimcore/components/collapse/collapse'
import {
  NoteAndEventDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/note-and-events-details'

interface NotesAndEventsTabViewProps {
  notes: Note[]
  pagination: React.JSX.Element
  onClickTrash: (id: number) => void
  elementType: ElementType
  elementId: number
  deleteLoading: boolean
}

export const NotesAndEventsTabView = ({
  notes,
  pagination,
  onClickTrash,
  elementId,
  elementType,
  deleteLoading
}: NotesAndEventsTabViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [addNoteModalOpen, setAddNoteModalOpen] = useState<boolean>(false)

  const NotesAndEvents: Array<{
    children: React.JSX.Element
    extra: React.JSX.Element
    label: React.JSX.Element
    key: string
  }> = notes.map((note) => {
    const extra = (): React.JSX.Element => {
      const type = note.type ?? undefined

      return (
        <Space
          align='center'
          size="extra-small"
        >
          {type !== undefined && <Tag>{type}</Tag>}
          <span>{formatDateTime({ timestamp: note.date, dateStyle: 'short', timeStyle: 'medium' })}</span>
          { !note.locked && (
          <IconButton
            aria-label={ i18n.t('aria.notes-and-events.delete') }
            icon={ { value: 'trash' } }
            loading={ deleteLoading }
            onClick={ (e) => {
              e.stopPropagation()
              onClickTrash(note.id)
            } }
            theme='primary'
          />
          )}
        </Space>
      )
    }

    const children = (): React.JSX.Element => {
      return (
        <>
          <Paragraph>{respectLineBreak(note.description)}</Paragraph>
          {note.data.length > 0 && <NoteAndEventDetails note={ note } />}
        </>
      )
    }

    const collapseDisabled = { disabled: true }

    return ({
      key: note.id.toString(),
      label: <Split
        dividerSize='small'
        size='extra-small'
        theme='secondary'
             >
        {note.title !== '' && (
        <>
          <Text
            strong
          >{note.title}</Text>
        </>
        )}
        <Text type='secondary'>{note.userName}</Text>
      </Split>,
      extra: extra(),
      children: children(),
      ...(note.description.length === 0 && collapseDisabled)
    })
  })

  return (
    <ContentLayout
      renderToolbar={ notes.length !== 0
        ? (
          <Toolbar
            justify='flex-end'
            theme='secondary'
          >
            <>
              {pagination}
            </>
          </Toolbar>
          )
        : undefined }
    >
      <Content
        padded
      >
        <Header
          className={ 'p-l-mini' }
          title={ t('notes-and-events.notes-and-events') }
        >
          <IconTextButton
            icon={ { value: 'new' } }
            onClick={ () => {
              setAddNoteModalOpen(true)
            } }
          >
            {t('new')}
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
          <Collapse
            accordion={ false }
            items={ NotesAndEvents }
          />
        </Content>
      </Content>
    </ContentLayout>
  )
}

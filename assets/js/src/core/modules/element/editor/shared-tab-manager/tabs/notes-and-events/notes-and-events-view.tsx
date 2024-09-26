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
import { AddNoteModal } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/modal/add-note-modal'
import { type ElementType } from '../../../../../../../../types/element-type.d'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tag } from 'antd'
import { Space } from '@Pimcore/components/space/space'
import i18n from 'i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import { Split } from '@Pimcore/components/split/split'
import { Paragraph } from '@Pimcore/components/paragraph/paragraph'

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

  const NotesAndEvents: Array<{
    children: React.JSX.Element
    extra: React.JSX.Element
    title: React.JSX.Element
    key: string
  }> = notes.map((note) => {
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

    const extra = (): React.JSX.Element => {
      const type = note.type !== '' ? t(`notes-and-events.${note.type}`) : undefined

      return (
        <Space
          align='center'
          size="extra-small"
        >
          {type !== undefined && <Tag>{type}</Tag>}
          <span>{formatDateTime({ timestamp: note.date, dateStyle: 'short', timeStyle: 'medium' })}</span>
          <IconButton
            aria-label={ i18n.t('aria.notes-and-events.delete') }
            icon='trash'
            onClick={ () => {
              onClickTrash(note.id)
            } }
            theme='primary'
          />
        </Space>
      )
    }

    const columnHelper = createColumnHelper<any>()

    const columns = [
      columnHelper.accessor(i18n.t('notes-and-events.name'), {}),
      columnHelper.accessor(i18n.t('notes-and-events.type'), { size: 120 }),
      columnHelper.accessor(i18n.t('notes-and-events.value'), { size: 310, meta: { autoWidth: true } })
    ]

    const children = (): React.JSX.Element => {
      return (
        <><span
          className={ 'panel-body__description ' + (showDetails ? 'panel-body__description-padding' : '') }
          >
          <Paragraph>{respectLineBreak(note.description)}</Paragraph>
        </span>
          {showDetails && (
          <div>
            <span className={ 'panel-body__details' }>{i18n.t('notes-and-events.details')}</span>
            <Grid
              autoWidth
              columns={ columns }
              data={ note.data }
              resizable
            />
          </div>
          )}
        </>
      )
    }

    const collapseDisabled = { disabled: true }

    return ({
      key: note.id.toString(),
      title: <Split
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
          <Accordion
            accordion={ false }
            items={ NotesAndEvents }
            spaced
          />
        </Content>
      </Content>
    </ContentToolbarSidebarLayout>
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { useNotifications } from './hooks/use-notifications'


export const NotificationList = (): React.JSX.Element => {
  const { t } = useTranslation()
  const {
    notifications,
    isLoading
  } = useNotifications()
  
  const Notification: Array<{
    children: React.JSX.Element
    extra: React.JSX.Element
    label: React.JSX.Element
    key: string
  }> = notifications && notifications.items.map((notification) => {
    const extra = (): React.JSX.Element => {
      const hasAttachment = notification.hasAttachment ?? undefined

      return (
        <Space
          align='center'
          size="extra-small"
        >
          {hasAttachment !== undefined && <Tag>attachment</Tag>}
          <span>{formatDateTime({ timestamp: notification.creationDate, dateStyle: 'short', timeStyle: 'medium' })}</span>
        </Space>
      )
    }

    const children = (): React.JSX.Element => {
      return (
        <>
          <Paragraph>{respectLineBreak("lorum ipsum dolor")}</Paragraph>
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

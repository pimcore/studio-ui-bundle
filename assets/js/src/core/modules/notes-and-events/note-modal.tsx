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
import { Modal } from '@Pimcore/components/modal/modal'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Text } from '@Pimcore/components/text/text'
import { isString, isUndefined } from 'lodash'
import type { DataNote } from '@Pimcore/modules/notes-and-events/hooks/use-global-notes-and-events'
import { Box } from '@Pimcore/components/box/box'
import {
  NoteAndEventDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/note-and-events-details'
import { formatDateTime } from '@Pimcore/utils/date-time'

export interface NoteModalProps {
  noteDetail: DataNote
  setNoteDetail: (note: undefined) => void
}

export const NoteModal = ({ noteDetail, setNoteDetail }: NoteModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const displayTextArea = (content: string, label: string, oneLiner: boolean = true): React.JSX.Element => {
    return (
      <Box
        margin={ 'small' }
      >
        <Text>{label}</Text>
        <TextArea
          disabled
          value={ content }
          { ...(oneLiner ? { autoSize: { maxRows: 1, minRows: 1 } } : { size: 'small' }) }
        />
      </Box>
    )
  }

  return (
    <Modal
      footer={ <></> }
      onCancel={ (): void => {
        setNoteDetail(undefined)
      } }
      onClose={ () => {
        setNoteDetail(undefined)
      } }
      open={ !isUndefined(noteDetail) }
      size={ 'L' }
      title={ t('notes-and-events-modal.detail-information') }
    >
      <>
        {displayTextArea(noteDetail.type, t('notes-and-events.columns.type'))}
        {displayTextArea(noteDetail.title, t('notes-and-events.columns.title'))}
        {displayTextArea(noteDetail.description, t('notes-and-events.columns.description'), false)}
        {noteDetail.data.length > 0 && (
          <Box margin={ 'small' }>
            <NoteAndEventDetails note={ noteDetail } />
          </Box>
        )}
        {isString(noteDetail.userName) && displayTextArea(noteDetail.userName, t('notes-and-events.columns.user'))}
        {displayTextArea(formatDateTime({ timestamp: noteDetail.date, dateStyle: 'short', timeStyle: 'short' }), t('notes-and-events.columns.date'))}
      </>
    </Modal>
  )
}

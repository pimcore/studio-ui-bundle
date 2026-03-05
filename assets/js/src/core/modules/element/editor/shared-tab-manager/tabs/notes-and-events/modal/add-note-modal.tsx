/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { AddNoteForm } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/form/add-note-form'
import { useNoteElementCreateMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { Form } from '@sdk/components'

export interface AddNoteFormValues {
  type: string
  title: string
  description: string
}

export interface AddNoteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  elementType: ElementType
  elementId: number
  refetchNotes: () => void
}

export const AddNoteModal = ({ ...props }: AddNoteModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [createNote, { isLoading }] = useNoteElementCreateMutation()

  async function addNote (title: string, type: string = '', description: string = ''): Promise<void> {
    await createNote({
      elementType: props.elementType,
      id: props.elementId,
      createNote: {
        type,
        title,
        description
      }
    })
  }

  async function onFinish (values: AddNoteFormValues): Promise<void> {
    await addNote(values.title, values.type, values.description)

    props.refetchNotes()
    props.setOpen(false)

    form.resetFields()
  }

  return (
    <Modal
      okButtonProps={ { loading: isLoading } }
      okText={ t('save') }
      onCancel={ () => {
        props.setOpen(false)
        form.resetFields()
      } }
      onOk={ () => { form.submit() } }
      open={ props.open }
      title={ (
        <ModalTitle iconName='new'>{ t('notes-and-events.new-note') }</ModalTitle>
          ) }
    >

      <AddNoteForm
        elementType={ props.elementType }
        form={ form }
        onFinish={ onFinish }
      />
    </Modal>
  )
}

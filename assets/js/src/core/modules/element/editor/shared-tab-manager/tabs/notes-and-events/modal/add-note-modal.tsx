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
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { AddNoteForm } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/form/add-note-form'
import { useForm } from 'antd/es/form/Form'
import {
  useNoteElementCreateMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { type ElementType } from '../../../../../../../types/enums/element/element-type'

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
}

export const AddNoteModal = ({ ...props }: AddNoteModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [createNote] = useNoteElementCreateMutation()
  const [saveInProgress, setSaveInProgress] = React.useState(false)

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
    setSaveInProgress(true)
    await addNote(values.title, values.type, values.description)
    props.setOpen(false)
    form.resetFields()
    setSaveInProgress(false)
  }

  return (
    <Modal
      okButtonProps={ { loading: saveInProgress } }
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

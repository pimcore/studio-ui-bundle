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

import React, { useEffect } from 'react'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Input } from '@Pimcore/components/input/input'
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { Flex, Form } from 'antd'
import {
  type Tag
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { type Mode } from '@Pimcore/modules/tags/tag-configuration-container'

interface TagValues {
  tagName: string
}

export interface TagConfigurationModalProps {
  mode: Mode
  setMode: (creationMode: Mode) => void
  tagConfigModalOpen: boolean
  setTagConfigModalOpen: (showBatchEditModal: boolean) => void
  focusTag: Tag
}

export const TagConfigurationModal = ({
  mode, setMode,
  tagConfigModalOpen,
  setTagConfigModalOpen,
  focusTag
}: TagConfigurationModalProps): React.JSX.Element => {
  const { handleTagUpdate, handleTagCreation } = useTagConfig()
  const [form] = Form.useForm()
  const closeModal = (): void => {
    setTagConfigModalOpen(false)
    setMode('create')
    form.resetFields()
  }

  useEffect(() => {
    if (tagConfigModalOpen) {
      form.setFieldsValue({
        tagName: focusTag?.text ?? '',
        parentTag: focusTag?.parentId ?? null
      })
    } else {
      form.resetFields()
    }
  }, [tagConfigModalOpen, focusTag])

  const handleSubmit = async (values: TagValues): Promise<void> => {
    if (values?.tagName.trim() === '') {
      return
      // FAIOIOIL
    }
    if (mode === 'update') {
      try {
        await handleTagUpdate(focusTag.id, focusTag.parentId, values.tagName)
        closeModal()
      } catch (error) {
        console.error('Error updating tag:', error)
      }
    } else if (mode === 'create') {
      try {
        await handleTagCreation(values.tagName, focusTag.id)
        closeModal()
      } catch (error) {
        console.error('Error creating tag:', error)
      }
    }
  }

  return (
    <Modal
      afterClose={ () => {
        setTagConfigModalOpen(false)
        setMode('create')
      } }
      footer={ <ModalFooter
        divider
        justify={ 'flex-end' }
               >
        <Button
          onClick={ () => { form.submit() } }
          type='primary'
        >Create</Button>
      </ModalFooter> }
      onCancel={ () => {
        setTagConfigModalOpen(false)
      } }
      open={ tagConfigModalOpen }
      size={ 'M' }
      title={ <ModalTitle>{mode === 'create' ? t('tag-configuration.new-tag') : t('tag-configuration.rename')}</ModalTitle> }
    >
      <Flex vertical>
        <Form
          form={ form }
          layout="vertical"
          onFinish={ handleSubmit }
        >
          <Form.Item
            label={ t('tag-configuration.name') }
            name="tagName"
            rules={ [{ required: true, message: 'Tag name is required!' }] }
          >
            <Input />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}

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
import { Select } from '@Pimcore/components/select/select'
import { Input } from '@Pimcore/components/input/input'
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { Flex, Form } from 'antd'
import {
  type ChangeTagParameters,
  type Tag
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'

export interface TagConfigurationModalProps {
  creationMode: boolean
  setCreationMode: (creationMode: boolean) => void
  tagConfigModalOpen: boolean
  setTagConfigModalOpen: (showBatchEditModal: boolean) => void
  focusTag: Tag
}

export const TagConfigurationModal = ({
  creationMode, setCreationMode,
  tagConfigModalOpen,
  setTagConfigModalOpen,
  focusTag
}: TagConfigurationModalProps): React.JSX.Element => {
  const { tagsWithChildren, updateATag } = useTagConfig()
  const [form] = Form.useForm()
  const closeModal = (): void => {
    setTagConfigModalOpen(false)
    setCreationMode(false)
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

  const handleSubmit = async (values: any): Promise<void> => {
    if (values?.tagName.trim() === '') {
      return
    }

    const createTagParameter: ChangeTagParameters = {
      parentId: values.parentTag ?? null,
      name: values.tagName
    }

    try {
      await updateATag(15, createTagParameter)
      closeModal()
    } catch (error) {
      console.error('Error updating tag:', error)
    }
  }

  console.log(tagsWithChildren.map(tag => tag.text))

  return (
    <Modal
      afterClose={ () => {
        setTagConfigModalOpen(false)
        setCreationMode(false)
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
      title={ <ModalTitle>{creationMode ? t('tag-configuration.new-tag') : t('tag-configuration.rename&move')}</ModalTitle> }
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
          <Form.Item
            label={ t('tag-configuration.parent-tag') }
            layout="vertical"
            name="parentTag"
          >
            <Select options={ tagsWithChildren.map(tag => ({ value: tag.id, label: tag.text.trim() })) } />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}

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
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { Select } from '@Pimcore/components/select/select'
import { Input } from '@Pimcore/components/input/input'
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { Flex, Form } from 'antd'

export interface TagConfigurationModalProps {
  creationMode: boolean
  setCreationMode: (creationMode: boolean) => void
  tagConfigModalOpen: boolean
  setTagConfigModalOpen: (showBatchEditModal: boolean) => void
}

export const TagConfigurationModal = ({
  creationMode, setCreationMode,
  tagConfigModalOpen,
  setTagConfigModalOpen
}: TagConfigurationModalProps): React.JSX.Element => {
  const { tagsWithChildren } = useTagConfig()
  const closeModal = (): void => {
    setTagConfigModalOpen(false)
    setCreationMode(false)
  }

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
          onClick={ () => {
            closeModal()
          } }
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
        <Form.Item
          label={ t('tags-configuration.name') }
          layout="vertical"
          name={ t('tags-configuration.name') }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={ t('tags-configuration.parent-tag') }
          layout="vertical"
          name={ t('tags-configuration.parent-tag') }
        >
          <Select
            options={ tagsWithChildren.map(tag => ({ value: tag.text, label: tag.text })) }
          />
        </Form.Item>
      </Flex>
    </Modal>
  )
}

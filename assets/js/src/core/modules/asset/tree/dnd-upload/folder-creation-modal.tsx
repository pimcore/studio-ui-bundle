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
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

interface FolderCreationModalProps {
  open: boolean
}

export const FolderCreationModal = ({ open }: FolderCreationModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Modal
      closable={ false }
      footer={ null }
      open={ open }
      title={ (
        <ModalTitle iconName='folder'>
          {t('asset.upload.folder-drop.creating-folders')}
        </ModalTitle>
      ) }
    >
      <Flex
        align="center"
        gap="small"
        justify="center"
        style={ { padding: '16px 0' } }
      >
        <Spin size="small" />
        <Text type="secondary">
          {t('asset.upload.folder-drop.creating-folders-hint')}
        </Text>
      </Flex>
    </Modal>
  )
}

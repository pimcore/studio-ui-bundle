/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Modal } from '@Pimcore/components/modal/modal'
import { type IWindowModalProps } from '@Pimcore/components/modal/window-modal/window-modal'
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'
import { TextArea, useMessage } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface AboutDialogProps extends Omit<IWindowModalProps, 'children'> {
  tokenUrl: string
  isLoading?: boolean
}

export const LoginTokenModal = ({ tokenUrl, isLoading = false, ...props }: AboutDialogProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { success, error } = useMessage()
  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>): void => {
    void copyToClipboardWithFeedback(
      tokenUrl,
      () => {
        void success(t('clipboard.copy.success'))
      },
      () => {
        void error(t('clipboard.copy.error'))
      }
    )

    props.onClose?.(e)
  }

  return (
    <Modal
      {...props}
      footer={<Flex justify="end"><ButtonGroup
        items={[
          <Button
            key="closeBtn"
            loading={isLoading}
            onClick={props.onClose}
          >
            {t('login-token-modal.close')}
          </Button>,
          <Button
            key="copyAndCloseBtn"
            loading={isLoading}
            onClick={copyToClipboard}
            type="primary"
          >
            {t('login-token-modal.copy-and-close')}
          </Button>
        ]}
      /></Flex>}
      title={t('login-token-modal.title')}
    >
      <Flex vertical>
        <p>{t('login-token-modal.description')}</p>
        <TextArea
          readOnly
          rows={5}
          value={tokenUrl}
        />
      </Flex>
    </Modal>
  )
}

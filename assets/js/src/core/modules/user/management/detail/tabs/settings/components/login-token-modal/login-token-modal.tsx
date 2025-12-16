import { ButtonGroup } from "@Pimcore/components/button-group/button-group"
import { Button } from "@Pimcore/components/button/button"
import { Flex } from "@Pimcore/components/flex/flex"
import { Modal } from "@Pimcore/components/modal/modal"
import { IWindowModalProps } from "@Pimcore/components/modal/window-modal/window-modal"
import { CodeEditor, Text, TextArea, useMessage } from '@sdk/components'
import React from "react"
import { useTranslation } from "react-i18next"
import { copyToClipboardWithFeedback } from '@Pimcore/utils/clipboard'

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
            onClick={props.onClose}
            loading={isLoading}
          >
            {t('login-token-modal.close')}
          </Button>,
          <Button
            type="primary"
            onClick={copyToClipboard}
            loading={isLoading}
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
          value={tokenUrl}
          readOnly
          rows={5}
        />
      </Flex>
    </Modal>
  )
}
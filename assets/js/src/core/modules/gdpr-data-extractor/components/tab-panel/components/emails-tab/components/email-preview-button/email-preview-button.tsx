import { EmailPreview } from "@Pimcore/modules/email/log/components/email-preview/email-preview"
import { IconButton, Modal, ModalTitle } from "@sdk/components"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

interface EmailPreviewButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
}

export const EmailPreviewButton = ({ id, onClick, ...iconButtonProps }: EmailPreviewButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <IconButton
        {...iconButtonProps}
        icon={{ value: 'code' }}
        onClick={(e) => {
          setIsOpen(true)
          onClick?.(e)
        }}
      />

      <Modal
        open={isOpen}
        onOk={() => {
          setIsOpen(false)
        }}
        onCancel={() => {
          setIsOpen(false)
        }}
        size="L"
        title={(
          <ModalTitle>
            {t('email-log.html.preview')}
          </ModalTitle>
        )}
      >
        <EmailPreview id={id} height={550} />
      </Modal>
    </>
  )
}
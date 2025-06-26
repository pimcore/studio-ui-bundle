import { Flex } from "@Pimcore/components/flex/flex";
import { EmailLog, useEmailLogGetByIdQuery } from "@Pimcore/modules/email/emails-api-slice.gen";
import React, { useState } from "react";
import { useEmailLog } from "../../hooks/use-email-log";
import { useTranslation } from "react-i18next";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";
import { ForwardModal } from "../forward-modal/forward-modal";
import { Text } from "@sdk/components";
import { Divider } from "antd";

interface EmailCardHeaderProps {
  email: EmailLog;
}

export const EmailCardHeader = ({ email }: EmailCardHeaderProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { resend, removeWithConfirmation } = useEmailLog()
  const [isForwardModalOpen, setIsForwardModalOpen] = useState<boolean>(false)
  const { data, isLoading } = useEmailLogGetByIdQuery({ id: email.id })

  return (
    <Flex className="email-log-content__header" justify="space-between">
      <Flex vertical>
        <Text type="secondary">{`${t('widget.email-log.from')}: ${email.from}`}</Text>

        <Flex gap="mini" align="center">
          <Text type="secondary">{`${t('widget.email-log.to')}: ${email.from}`}</Text>
          {data?.cc && (
            <>
              <Divider type="vertical" />
              <Text type="secondary">{`${t('widget.email-log.cc')}: ${data.cc}`}</Text>
            </>
          )}

          {data?.bcc && (
            <>
              <Divider type="vertical" />
              <Text type="secondary">{`${t('widget.email-log.bcc')}: ${data.bcc}`}</Text>
            </>
          )}
        </Flex>
      </Flex>

      <div>
        <IconButton
          icon={{ value: 'vector' }}
          onClick={() => resend(email.id)}
        />

        <IconButton
          icon={{ value: 'flip-forward' }}
          onClick={() => setIsForwardModalOpen(true)}
        />

        <IconButton
          icon={{ value: 'trash' }}
          onClick={() => removeWithConfirmation(email.id)} //TODO: add confirmation modal
        />
      </div>

      <ForwardModal
        email={email}
        open={isForwardModalOpen}
        setOpen={setIsForwardModalOpen}
      />
    </Flex>
  )
}
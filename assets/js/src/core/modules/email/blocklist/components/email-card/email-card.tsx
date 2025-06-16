import { Card } from "@Pimcore/components/card/card"
import { Flex } from "@Pimcore/components/flex/flex"
import { Blocklist } from "@Pimcore/modules/email/emails-api-slice.gen"
import { IconButton, Spin } from "@sdk/components"
import { formatDateTime } from "@sdk/utils"
import { Space } from "antd"
import React, { useState } from "react"
import { useEmailBlocklist } from "../../hooks/use-email-blocklist"
import { useTranslation } from "react-i18next"

interface EmailCardProps {
  entry: Blocklist
}

export const EmailCard = ({ entry }: EmailCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { removeEmail } = useEmailBlocklist()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Card>
      <Flex align="center" justify="space-between">
        <span>{entry.email}</span>

        <Space>
          <span>{formatDateTime({ timestamp: entry.modificationDate!, dateStyle: 'short', timeStyle: 'short' })}</span>

          <IconButton
            icon={isLoading ? { value: 'spinner' } : { value: 'trash' }}
            type="link"
            role={'button'}
            loading={isLoading}
            onClick={() => {
              setIsLoading(true)
              void removeEmail(entry.email)
            }}
            aria-label={t('aria.email-blocklist.remove.email')}
          />
        </Space>
      </Flex>
    </Card>
  )
}
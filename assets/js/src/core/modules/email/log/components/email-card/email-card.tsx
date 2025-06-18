import { Accordion } from "@Pimcore/components/accordion/accordion"
import { Collapse, ICollapseItem } from "@Pimcore/components/collapse/collapse"
import { Flex } from "@Pimcore/components/flex/flex"
import { Icon } from "@Pimcore/components/icon/icon"
import { EmailLog } from "@Pimcore/modules/email/emails-api-slice.gen"
import { formatDateTime } from "@sdk/utils"
import React from "react"
import { useTranslation } from "react-i18next"

interface EmailCardProps {
  emails: EmailLog[]
}

export const EmailCard = ({ emails }: EmailCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const items: ICollapseItem[] = emails.map((email) => ({
    key: email.id.toString(),
    label: <Flex align="center" gap="extra-small">
      <Icon value="send-03" />
      <span>{email.subject}</span>
    </Flex>,
    subLabel: <Flex gap={4}>
      <span>{`${t('widget.email-log.from')}: ${email.from}`}</span> |
      <span>{`${t('widget.email-log.to')}: ${email.to}`}</span>
    </Flex>,
    subLabelPosition: 'inline',
    extra: <Flex gap={4} align="center">
      {!email.hasError && <Icon value="x-circle" />}
      <span>{formatDateTime({ timestamp: email.sentDate, dateStyle: 'short', timeStyle: 'short' })}</span>
    </Flex>
  }))

  return (
    <Collapse
      items={items}
    />
  )
}
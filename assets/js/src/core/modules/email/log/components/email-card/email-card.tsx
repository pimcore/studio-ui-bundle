import { Collapse, ICollapseItem } from "@Pimcore/components/collapse/collapse"
import { Flex } from "@Pimcore/components/flex/flex"
import { Icon } from "@Pimcore/components/icon/icon"
import { Tabs } from "@Pimcore/components/tabs/tabs"
import { Text } from "@Pimcore/components/text/text"
import { EmailLog } from "@Pimcore/modules/email/emails-api-slice.gen"
import { IconButton } from "@sdk/components"
import { formatDateTime } from "@sdk/utils"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useEmailLog } from "../../hooks/use-email-log"
import { EmailPreview } from "../email-preview/email-preview"
import { ForwardModal } from "../forward-modal/forward-modal"
import { ParametersTab } from "../parameters-tab/parameters-tab"
import { TextPreview } from "../text-preview/text-preview"
import { useStyles } from "./email-card.styles"

interface EmailCardProps {
  emails: EmailLog[]
}

export const EmailCard = ({ emails }: EmailCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { resend, remove } = useEmailLog()
  const [isForwardModalOpen, setIsForwardModalOpen] = useState<boolean>(false)

  const createEmailEntry = (email: EmailLog): ICollapseItem => {
    const tabItems = [
      {
        label: t('widget.email-log.tab.text'),
        key: 'text',
        children: <TextPreview email={email} />
      },
      {
        label: t('widget.email-log.tab.html'),
        key: 'html',
        children: <EmailPreview email={email} />
      },
      {
        label: t('widget.email-log.tab.parameters'),
        key: 'parameters',
        children: <ParametersTab email={email} />
      }
    ]


    return {
      key: email.id.toString(),
      label: <Flex align="center" gap="extra-small">
        <Icon value="send-03" />
        <span>{email.subject}</span>
        <span>- {email.id}</span>
      </Flex>,
      subLabel: <Flex gap={4}>
        <span>{`${t('widget.email-log.from')}: ${email.from}`}</span> |
        <span>{`${t('widget.email-log.to')}: ${email.to}`}</span>
      </Flex>,
      theme: email.hasError ? 'error' : 'default',
      subLabelPosition: 'inline',
      extra: <Flex gap={4} align="center">
        {email.hasError && <Icon className={styles.errorIcon} value="close-filled" />}
        <span>{formatDateTime({ timestamp: email.sentDate, dateStyle: 'short', timeStyle: 'short' })}</span>
      </Flex>,
      children: (
        <Flex className="email-log-content" vertical>
          <Flex className="email-log-content__header" justify="space-between">
            <Flex vertical>
              <Text type="secondary">{`${t('widget.email-log.from')}: ${email.from}`}</Text>
              <Text type="secondary">{`${t('widget.email-log.to')}: ${email.from}`}</Text>
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
                onClick={() => remove(email.id)} //TODO: add confirmation modal
              />
            </div>
          </Flex>

          <Tabs
            destroyInactiveTabPane
            items={tabItems}
            noPadding
          />

          <ForwardModal
            email={email}
            open={isForwardModalOpen}
            setOpen={setIsForwardModalOpen}
          />
        </Flex>
      )
    }
  }

  const items: ICollapseItem[] = emails.map((email) => (
    createEmailEntry(email)
  ))

  return (
    <Collapse
      items={items}
    />
  )
}
import { Collapse, ICollapseItem } from "@Pimcore/components/collapse/collapse"
import { Flex } from "@Pimcore/components/flex/flex"
import { Icon } from "@Pimcore/components/icon/icon"
import { Tabs } from "@Pimcore/components/tabs/tabs"
import { EmailLog } from "@Pimcore/modules/email/emails-api-slice.gen"
import { formatDateTime } from "@sdk/utils"
import React from "react"
import { useTranslation } from "react-i18next"
import { EmailCardHeader } from "../email-card-header/email-card-header"
import { EmailError } from "../email-error/email-error"
import { EmailPreview } from "../email-preview/email-preview"
import { ParametersTab } from "../parameters-tab/parameters-tab"
import { TextPreview } from "../text-preview/text-preview"
import { useStyles } from "./email-card.styles"
import { Divider } from "@Pimcore/components/divider/divider"

interface EmailCardProps {
  emails: EmailLog[]
}

export const EmailCard = ({ emails }: EmailCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

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
      </Flex>,
      subLabel: <Flex gap={'mini'} align="center">
        <span>{`${t('widget.email-log.from')}: ${email.from}`}</span>
        <Divider type="vertical" className={styles.divider} />
        <span>{`${t('widget.email-log.to')}: ${email.to}`}</span>
      </Flex>,
      theme: email.hasError ? 'error' : 'default',
      subLabelPosition: 'inline',
      extra: <Flex gap={4} align="center">
        {email.hasError && <Icon className={styles.errorIcon} value="close-filled" />}
        <span>{formatDateTime({ timestamp: email.sentDate, dateStyle: 'short', timeStyle: 'short' })}</span>
      </Flex>,
      children: (
        <Flex className="email-log-content" vertical gap={'small'}>
          <EmailCardHeader email={email} />

          {email.hasError && (
            <Flex vertical>
              <EmailError email={email} />
            </Flex>
          )}

          <Tabs
            destroyInactiveTabPane
            items={tabItems}
            noPadding
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
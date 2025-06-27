import { Content } from "@Pimcore/components/content/content"
import { EmailLog, useEmailLogGetHtmlQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import { isUndefined } from "lodash"
import React from "react"
import { useStyles } from "./email-preview.styles"
import { useTranslation } from "react-i18next"

interface EmailPreviewProps {
  email: EmailLog
  height?: number
}

export const EmailPreview = ({ email, height = 650 }: EmailPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { data, isLoading } = useEmailLogGetHtmlQuery({ id: email.id })

  return (
    <Content
      loading={isLoading}
      none={isUndefined(data?.data) || data.data.length === 0}
    >
      <iframe
        title={t('aria.email-log.html.preview')}
        height={height}
        className={styles.iframe}
        srcDoc={data?.data ?? ""}
        sandbox=""
      />
    </Content>
  )
}
import { Content } from "@Pimcore/components/content/content"
import { EmailLog, useEmailLogGetHtmlQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import { isUndefined } from "lodash"
import React from "react"
import { useStyles } from "./html-tab-styles"

interface HtmlTabProps {
  email: EmailLog
}

export const HtmlTab = ({ email }: HtmlTabProps): React.JSX.Element => {
  const { data, isLoading } = useEmailLogGetHtmlQuery({ id: email.id })
  const { styles } = useStyles()

  return (
    <Content
      loading={isLoading}
      none={isUndefined(data?.data) || data.data.length === 0}
    >
      <iframe
        className={styles.iframe}
        srcDoc={data?.data || ""}
        sandbox=""
      />
    </Content>
  )
}
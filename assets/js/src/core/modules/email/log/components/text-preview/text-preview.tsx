import { Content } from "@Pimcore/components/content/content"
import { getLanguageExtensions } from "@Pimcore/components/text-editor/detect-language"
import { EmailLog, useEmailLogGetTextQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import ReactCodeMirror from "@uiw/react-codemirror"
import { isUndefined } from "lodash"
import React from "react"
import { useStyles } from "./text-preview-styles"

interface TextPreviewProps {
  email: EmailLog
}

export const TextPreview = ({ email }: TextPreviewProps): React.JSX.Element => {
  const { data, isLoading } = useEmailLogGetTextQuery({ id: email.id })
  const { styles } = useStyles()

  return (
    <Content
      loading={isLoading}
      none={isUndefined(data?.data) || data.data.length === 0}
    >
      <ReactCodeMirror
        basicSetup={{
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        }}
        className={styles.codeEditor}
        readOnly={true}
        value={data?.data || ""}
        extensions={getLanguageExtensions('html')}
      />
    </Content>
  )
}
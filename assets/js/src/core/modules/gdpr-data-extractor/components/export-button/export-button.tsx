import { IconButton } from "@sdk/components"
import React from "react"
import { useLazyGdprExportQuery } from "../../gdpr-data-extractor-slice-enhanced"

interface ExportButtonProps {
  id: number
  providerKey: string
}

export const ExportButton = (props: ExportButtonProps): React.JSX.Element => {
  const [trigger, { isLoading }] = useLazyGdprExportQuery()

  return (
    <IconButton
      icon={{ value: 'export' }}
      loading={isLoading}
      onClick={() => {
        trigger(props)
      }}
    />
  )
}
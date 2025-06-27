import { EmailLog, useEmailLogGetByIdQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import { Alert } from "@sdk/components"
import React from "react"

interface EmailErrorProps {
  email: EmailLog
}

export const EmailError = ({ email }: EmailErrorProps): React.JSX.Element => {
  const { data, isLoading } = useEmailLogGetByIdQuery({ id: email.id })

  if (isLoading) {
    return <></>
  }

  return (
    <Alert
      description={data?.error ?? ''}
      showIcon
      type="error"
    />
  )
}
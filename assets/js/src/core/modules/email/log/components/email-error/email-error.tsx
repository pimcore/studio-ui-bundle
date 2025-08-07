/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type EmailLog, useEmailLogGetByIdQuery } from '@Pimcore/modules/email/emails-api-slice.gen'
import { Alert } from '@sdk/components'
import React from 'react'

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
      description={ data?.error ?? '' }
      showIcon
      type="error"
    />
  )
}

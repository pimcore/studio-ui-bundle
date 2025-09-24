/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { useNotificationGetRecipientsQuery } from '@Pimcore/modules/notifications/notifications-slice.gen'
import React from 'react'

interface UserSelectProps extends SelectProps { }

export const UserSelect = ({ ...selectProps }: UserSelectProps): React.JSX.Element => {
  const { data, isLoading } = useNotificationGetRecipientsQuery()

  const options = data?.items.map((user) => ({
    label: user.recipientName,
    value: user.id
  })) ?? []

  return (
    <Select
      loading={isLoading}
      options={options}
      {...selectProps}
    />
  )
}

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
import { useUserGetCollectionQuery } from '@Pimcore/modules/user/user-api-slice.gen'
import React from 'react'

interface UserSelectProps extends SelectProps {
  onChange: (value: string | null) => void
}

export const UserSelect = ({ onChange, ...selectProps }: UserSelectProps): React.JSX.Element => {
  const { data, isLoading } = useUserGetCollectionQuery()

  const options = data?.items.map((user) => ({
    label: user.username,
    value: user.id
  })) ?? []

  return (
    <Select
      loading={ isLoading }
      onChange={ onChange }
      options={ options }
      { ...selectProps }
    />
  )
}

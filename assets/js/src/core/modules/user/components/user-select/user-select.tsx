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
import React from 'react'
import { useUserGetCollectionQuery } from '../../user-api-slice-enhanced'

interface UserSelectProps extends SelectProps {}

export const UserSelect = ({ ...selectProps }: UserSelectProps): React.JSX.Element => {
  const { data, isLoading } = useUserGetCollectionQuery()

  const options = data?.items.map((user) => ({
    label: user.username,
    value: user.id
  })) ?? []

  return (
    <Select
      loading={ isLoading }
      options={ options }
      { ...selectProps }
    />
  )
}

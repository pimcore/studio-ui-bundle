/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@sdk/components'
import React from 'react'
import { useUser } from '../../hooks/use-user'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { useAppDispatch } from '@Pimcore/app/store'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon' | 'loading'> {
  id: number
  label: string
  providerKey: string
  onFinish?: () => void
}

export const DeleteButton = ({ id, label, providerKey, onClick, onFinish, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteUser, isLoading } = useUser()
  const dispatch = useAppDispatch()

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'trash' } }
      loading={ isLoading }
      onClick={ (e) => {
        deleteUser(id, label, () => {
          dispatch(
            api.util.invalidateTags(
              invalidatingTags.GDPR_DATA(providerKey)
            )
          )
        })
        onClick?.(e)
      } }
    />
  )
}

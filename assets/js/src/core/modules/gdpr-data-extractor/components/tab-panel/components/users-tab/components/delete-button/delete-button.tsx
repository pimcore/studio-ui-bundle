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

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon' | 'loading'> {
  id: number
  label: string
  onFinish?: () => void
}

export const DeleteButton = ({ id, label, onClick, onFinish, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteUser, isLoading } = useUser()

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'trash' } }
      loading={ isLoading }
      onClick={ (e) => {
        deleteUser(id, label, onFinish)
        onClick?.(e)
      } }
    />
  )
}

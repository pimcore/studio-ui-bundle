/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { useEmailLog } from '@Pimcore/modules/email/log/hooks/use-email-log'
import { IconButton } from '@sdk/components'
import React, { useState } from 'react'


interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  providerKey: string
  label: string
}

export const DeleteButton = ({ id, providerKey, label, onClick, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { removeWithConfirmation } = useEmailLog()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'trash' } }
      loading={ isDeleting || iconButtonProps.loading }
      onClick={ (e) => {
        setIsDeleting(true)
        removeWithConfirmation(id, () => {
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

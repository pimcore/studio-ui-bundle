/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from '@sdk/components'
import { useDelete } from '@sdk/modules/element'
import React, { useState } from 'react'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  elementType: ElementType
  providerKey: string
  label: string
}

export const DeleteButton = ({ id, elementType, label, providerKey, onClick, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteElement } = useDelete(elementType)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  return (
    <IconButton
      { ...iconButtonProps }
      icon={ { value: 'trash' } }
      loading={ isDeleting || iconButtonProps.loading }
      onClick={ (e) => {
        setIsDeleting(true)
        deleteElement(id, label, undefined, () => {
          setIsDeleting(false)

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

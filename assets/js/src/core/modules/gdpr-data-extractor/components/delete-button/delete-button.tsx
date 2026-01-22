import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from "@sdk/components"
import { useDelete } from '@sdk/modules/element'
import React, { useState } from "react"

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  elementType: ElementType
  label: string
}

export const DeleteButton = ({ id, elementType, label, onClick, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteElement } = useDelete(elementType)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <IconButton
      {...iconButtonProps}
      icon={{ value: 'trash' }}
      loading={isDeleting || iconButtonProps.loading}
      onClick={(e) => {
        setIsDeleting(true)
        deleteElement(id, label, undefined, () => {
          setIsDeleting(false)
        });
        onClick?.(e)
      }}
    />
  )
}
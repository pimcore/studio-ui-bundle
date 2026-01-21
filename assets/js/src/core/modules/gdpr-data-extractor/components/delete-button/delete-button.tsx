import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from "@sdk/components"
import { useDelete } from '@sdk/modules/element'
import React from "react"

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  elementType: ElementType
  label: string
}

export const DeleteButton = ({ id, elementType, label, onClick, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteElement } = useDelete(elementType)

  return (
    <IconButton
      {...iconButtonProps}
      icon={{ value: 'trash' }}
      onClick={(e) => {
        deleteElement(id, label);
        onClick?.(e)
      }}
    />
  )
}
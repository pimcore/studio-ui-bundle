import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from "@sdk/components"
import { useDelete } from '@sdk/modules/element'
import React from "react"

interface DeleteButtonProps {
  id: number
  elementType: ElementType
  label: string
}

export const DeleteButton = ({ id, elementType, label }: DeleteButtonProps): React.JSX.Element => {
  const { deleteElement } = useDelete(elementType)

  return (
    <IconButton
      icon={{ value: 'trash' }}
      onClick={() => {
        deleteElement(id, label);
      }}
    />
  )
}
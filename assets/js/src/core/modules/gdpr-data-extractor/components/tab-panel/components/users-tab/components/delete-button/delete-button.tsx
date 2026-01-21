import { IconButton } from "@sdk/components"
import React from "react"
import { useUser } from "../../hooks/use-user"

interface DeleteButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon' | 'loading'> {
  id: number
  label: string
}

export const DeleteButton = ({ id, label, onClick, ...iconButtonProps }: DeleteButtonProps): React.JSX.Element => {
  const { deleteUser, isLoading } = useUser()

  return (
    <IconButton
      {...iconButtonProps}
      icon={{ value: 'trash' }}
      loading={isLoading}
      onClick={(e) => {
        deleteUser(id, label)
        onClick?.(e)
      }}
    />
  )
}
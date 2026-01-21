import { elementTypes, type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from "@sdk/components"
import { useElementHelper } from "@sdk/modules/element"
import React from "react"

interface OpenButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'id' | 'icon'> {
  id: number
  elementType: ElementType
}

export const OpenButton = ({ id, elementType, onClick, ...iconButtonProps }: OpenButtonProps): React.JSX.Element => {
  const { openElement } = useElementHelper()

  return (
    <IconButton
      {...iconButtonProps}
      icon={{ value: 'open-folder' }}
      onClick={(e) => {
        openElement({ id, type: elementType })
        onClick?.(e)
      }}
    />
  )
}
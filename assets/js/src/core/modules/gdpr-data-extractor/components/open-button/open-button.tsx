import { elementTypes, type ElementType } from '@Pimcore/types/enums/element/element-type'
import { IconButton } from "@sdk/components"
import { useElementHelper } from "@sdk/modules/element"
import React from "react"

interface OpenButtonProps {
  id: number
  elementType: ElementType
}

export const OpenButton = ({ id, elementType }: OpenButtonProps): React.JSX.Element => {
  const { openElement } = useElementHelper()

  return (
    <IconButton
      icon={{ value: 'open-folder' }}
      onClick={() => {
        openElement({ id, type: elementType })
      }}
    />
  )
}
import React from "react"
import { FieldCollectionRegistry } from "./field-collection-registry"
import { Form } from "../../form"
import { FieldCollectionContent } from "./field-collection-content"
import { FieldCollectionProvider } from "./field-collection-provider"

export interface FieldCollectionProps {
  value?: any[]
  onChange?: (value: any[]) => void
  registry: FieldCollectionRegistry
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
  title?: string
  collapsed?: boolean
}

export const FieldCollection = (props: FieldCollectionProps): React.JSX.Element => {
  const { value, onChange } = props
  
  const defaultValues = {
    collapsed: false
  }
  
  const finalProps = { ...defaultValues, ...props }

  return (
    <FieldCollectionProvider {...finalProps}>
      <Form.NumberedList
        value={value}
        onChange={onChange}
      >
        <FieldCollectionContent />
      </Form.NumberedList>
    </FieldCollectionProvider>
  )
}

import { Form } from "@Pimcore/components/form/form"
import { WidgetConfig } from "@Pimcore/modules/perspectives/perspectives-slice.enhanced"
import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from "react"

interface WidgetFormProviderProps {
  children: React.ReactNode
  widget: WidgetConfig
}

export interface WidgetFormContextProps {
  widget: WidgetConfig
  form: ReturnType<typeof Form.useForm>[0]
  formData: WidgetConfig
  setFormData: Dispatch<SetStateAction<WidgetConfig>>
}

export const WidgetFormContext = createContext<WidgetFormContextProps | undefined>(undefined)

export const WidgetFormProvider = ({ children, widget }: WidgetFormProviderProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState<WidgetConfig>(widget)

  const contextValue: WidgetFormContextProps = useMemo(() => ({
    widget,
    form,
    formData,
    setFormData
  }), [widget, form, formData])

  return (
    <WidgetFormContext.Provider value={contextValue}>
      {children}
    </WidgetFormContext.Provider>
  )
}
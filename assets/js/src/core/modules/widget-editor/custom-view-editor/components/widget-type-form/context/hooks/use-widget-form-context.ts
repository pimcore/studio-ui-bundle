import { useContext } from "react"
import { WidgetFormContext, WidgetFormContextProps } from "../widget-form-provider"

export const useWidgetFormContext = (): WidgetFormContextProps => {
  const context = useContext(WidgetFormContext)

  if (context === undefined) {
    throw new Error('useWidgetFormContext must be used within a WidgetFormProvider')
  }

  return context

}
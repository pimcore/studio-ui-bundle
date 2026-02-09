import { Form } from "@Pimcore/components/form/form";
import React, { createContext, useMemo, useState } from "react";

interface SystemSettingsProviderProps {
  children: React.ReactNode
}

export interface SystemSettingsContextProps {
  form: ReturnType<typeof Form.useForm>[0]
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SystemSettingsContext = createContext<SystemSettingsContextProps | undefined>(undefined)
export const SystemSettingsProvider = ({ children }: SystemSettingsProviderProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const contextValue: SystemSettingsContextProps = useMemo(() => ({
    form,
    isLoading,
    setIsLoading
  }), [form, isLoading])
  return (
    <SystemSettingsContext.Provider value={contextValue}>
      {children}
    </SystemSettingsContext.Provider>
  )
}

import { useContext } from 'react'
import { SystemSettingsContext, SystemSettingsContextProps } from '../system-settings-provider'

export const useSystemSettingsContext = (): SystemSettingsContextProps => {
  const context = useContext(SystemSettingsContext)

  if (context === undefined) {
    throw new Error('useSystemSettingsContext must be used within a SystemSettingsProvider')
  }

  return context
}
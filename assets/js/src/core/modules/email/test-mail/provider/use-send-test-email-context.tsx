import { isNil } from "lodash"
import { useContext } from "react"
import { SendTestEmailContext, SendTestEmailContextProps } from "./send-test-email-provider"

export const useSendTestEmailContext = (): SendTestEmailContextProps => {
  const context = useContext(SendTestEmailContext)
  if (isNil(context)) {
    throw new Error('useSendTestEmailContext must be used within a SendTestEmailProvider')
  }

  return context
}
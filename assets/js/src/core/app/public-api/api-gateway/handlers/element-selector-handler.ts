import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ElementSelectorConfig } from '@sdk/modules/element'

export const openElementSelectorHandler: ApiGatewayHandler = (payload, context) => {
  const config: ElementSelectorConfig = payload
  const { elementSelectorHelper } = context
  
  elementSelectorHelper.setConfig(config)
  elementSelectorHelper.open()
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ElementSelectorConfig } from '@sdk/modules/element'

export const openElementSelectorHandler: ApiGatewayHandler = (payload, context) => {
  const config: ElementSelectorConfig = payload
  const { elementSelectorHelper } = context

  elementSelectorHelper.setConfig(config)
  elementSelectorHelper.open()
}

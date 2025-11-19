/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { withGlobalContextSubscriber } from '@Pimcore/modules/element/listing/decorators/global-context/with-global-context-subscriber'
import { type AbstractDecorator } from '@sdk/modules/element'

export const GlobalContextDecorator: AbstractDecorator = (props) => {
  const { ViewComponent } = { ...props }

  return {
    ...props,
    ViewComponent: withGlobalContextSubscriber(ViewComponent)
  }
}

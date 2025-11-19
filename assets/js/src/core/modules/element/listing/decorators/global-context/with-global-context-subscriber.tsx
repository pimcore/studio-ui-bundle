/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractDecoratorProps } from '@sdk/modules/element'
import { GlobalContextSubscriber } from '@Pimcore/modules/element/listing/decorators/global-context/view-layer/global-context-subscriber'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'

export const withGlobalContextSubscriber = (Component: AbstractDecoratorProps['ViewComponent']): AbstractDecoratorProps['ViewComponent'] => {
  const ViewComponentWithGlobalContextSubscriber = (): React.JSX.Element => {
    const { data } = useData()

    return (
      <>
        <Component />

        {data !== undefined && <GlobalContextSubscriber />}
      </>
    )
  }

  return ViewComponentWithGlobalContextSubscriber
}

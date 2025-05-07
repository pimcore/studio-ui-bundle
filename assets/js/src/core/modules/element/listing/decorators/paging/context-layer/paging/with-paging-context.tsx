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
import { type AbstractDecoratorProps } from '../../../abstract-decorator'
import { PagingProvider } from './provider/paging-provider'

export const withPagingContext = (ContextComponent: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const PagingContextComponent = (): React.JSX.Element => {
    return (
      <PagingProvider>
        <ContextComponent />
      </PagingProvider>
    )
  }

  return PagingContextComponent
}

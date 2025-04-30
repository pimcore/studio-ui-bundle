/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type defaultProps } from '../../../abstract/listing-container'
import React from 'react'
import { SortingProvider } from './provider/sorting-provider/sorting-provider'

export const withSortingContext = (Component: typeof defaultProps['ContextComponent']): typeof defaultProps['ContextComponent'] => {
  const SortingContextComponent: typeof defaultProps['ContextComponent'] = () => {
    return (
      <SortingProvider>
        <Component />
      </SortingProvider>
    )
  }

  return SortingContextComponent
}

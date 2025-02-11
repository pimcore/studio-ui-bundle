/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

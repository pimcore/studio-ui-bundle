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
import { RowSelectionProvider } from './provider/row-selection-provider'

export const withRowSelectionContext = (Component: typeof defaultProps['ContextComponent']): typeof defaultProps['ContextComponent'] => {
  const RowSelectionComponent: typeof defaultProps['ContextComponent'] = () => {
    return (
      <RowSelectionProvider>
        <Component />
      </RowSelectionProvider>
    )
  }

  return RowSelectionComponent
}

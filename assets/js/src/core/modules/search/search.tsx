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
import { SearchButton } from './triggers/button/search-button'
import { SearchModal } from './modal/search-modal'
import { SearchProvider } from './provider/search-provider'

export const Search = (): React.JSX.Element => {
  return (
    <SearchProvider>
      <SearchButton />
      <SearchModal />
    </SearchProvider>
  )
}

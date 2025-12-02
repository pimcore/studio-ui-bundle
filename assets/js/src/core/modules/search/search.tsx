/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import React from 'react'
import { SearchModal } from './modal/search-modal'
import { SearchProvider } from './provider/search-provider'
import { SearchButton } from './triggers/button/search-button'

export const Search = (): React.JSX.Element | null => {
  if (isAllowedInPerspective(NavPermission.SearchHidden)) {
    return null
  }

  return (
    <SearchProvider>
      <SearchButton />
      <SearchModal />
    </SearchProvider>
  )
}

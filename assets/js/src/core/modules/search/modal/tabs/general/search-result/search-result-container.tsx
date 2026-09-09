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
import { useGlobalSearchMode } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/use-global-search-mode'
import { SearchResult } from './search-result'
import { GlobalModeSearchResult } from './global-mode-search-result'

/** Picks the All tab's data source from the shared search mode. */
export const SearchResultContainer = (): React.JSX.Element => {
  const { activeMode } = useGlobalSearchMode()
  const adapter = activeMode?.getGlobalSearch?.()

  if (activeMode === undefined || adapter === undefined) {
    return <SearchResult />
  }

  return (
    <GlobalModeSearchResult
      adapter={ adapter }
      key={ activeMode.id }
    />
  )
}

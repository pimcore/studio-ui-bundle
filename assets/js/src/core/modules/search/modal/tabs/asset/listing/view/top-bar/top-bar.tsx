/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ProvidedTypeSelect } from '@Pimcore/modules/element/components/type-select/provided-type-select'
import { SearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import React from 'react'

export const TopBar = (): React.JSX.Element => {
  const { isOpen, setSearchTerm } = useSearch()

  return (
    <Toolbar
      padding={ { left: 'none', right: 'none' } }
      position='none'
      // 'auto': a blocked search mode renders a warning line under the input — a fixed-height
      // toolbar clips it.
      size='auto'
      theme='secondary'
    >
      <SearchTermFilter
        onCommit={ isOpen ? setSearchTerm : undefined }
        prefixControls={ <ProvidedTypeSelect /> }
      />
    </Toolbar>
  )
}

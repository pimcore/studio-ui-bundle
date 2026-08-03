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
import { ClassDefinitionSelect } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/components/class-definition-select/class-definition-select'
import { ProvidedTypeSelect } from '@Pimcore/modules/element/components/type-select/provided-type-select'
import { SearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter'
import { Flex } from '@Pimcore/components/flex/flex'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import React from 'react'

export const TopBar = (): React.JSX.Element => {
  // Term sharing across tabs only applies inside the Quick Search modal — in other hosts of
  // this listing (e.g. the saved-search widget) isOpen is always false.
  const { isOpen, setSearchTerm } = useSearch()

  return (
    <Toolbar
      padding={ { left: 'none', right: 'none' } }
      position='none'
      theme='secondary'
    >
      <Flex
        className='w-full'
        gap={ 'extra-small' }
      >
        <ProvidedTypeSelect />
        <ClassDefinitionSelect nullable />
        <SearchTermFilter onCommit={ isOpen ? setSearchTerm : undefined } />
      </Flex>
    </Toolbar>
  )
}

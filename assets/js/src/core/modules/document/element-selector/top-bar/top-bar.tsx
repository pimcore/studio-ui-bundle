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
import { SearchTermFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter'
import React from 'react'
import { ProvidedTypeSelect } from '../../../element/components/type-select/provided-type-select'
import { Flex } from '@Pimcore/components/flex/flex'

export const TopBar = (): React.JSX.Element => {
  return (
    <Toolbar
      borderStyle='default'
      padding={ { left: 'none', right: 'none' } }
      position='top'
      theme='secondary'
    >
      <Flex
        className='w-full'
        gap={ 'small' }
      >
        <ProvidedTypeSelect />
        <SearchTermFilter />
      </Flex>
    </Toolbar>
  )
}

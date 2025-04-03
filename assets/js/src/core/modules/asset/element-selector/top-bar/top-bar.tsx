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

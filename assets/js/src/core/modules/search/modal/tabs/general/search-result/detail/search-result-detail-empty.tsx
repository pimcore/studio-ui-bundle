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

import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import React from 'react'

export const SearchResultDetailEmpty = (): React.JSX.Element => {
  return (
    <Content>
      <Flex
        align='center'
        className='h-full w-full'
        justify='center'
      >
        <NoContent text='No item selected' />
      </Flex>
    </Content>
  )
}

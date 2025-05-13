/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import React from 'react'
import { useSearch } from '../../provider/use-search'

export const SearchButton = (): React.JSX.Element => {
  const { open } = useSearch()

  return (
    <IconButton
      icon={ { value: 'search' } }
      onClick={ () => { open() } }
      type='text'
    />
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

export const Search = (): React.JSX.Element => {
  const [currentSearch, setCurrentSearch] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentSearch(event.target.value)
  }

  return (
    <SearchInput
      className='w-full'
      maxWidth='100%'
      onChange={ handleChange }
      placeholder='Search'
      value={ currentSearch }
    />
  )
}

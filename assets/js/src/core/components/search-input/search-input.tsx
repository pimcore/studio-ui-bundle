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

import React from 'react'
import Search, { type SearchProps as AntSearchProps } from 'antd/es/input/Search'
import cn from 'classnames'
import { useStyles } from './search-input.styles'

interface ISearchInputProps extends AntSearchProps {
  className?: string
  withoutAddon?: boolean
}

export const SearchInput = ({ className, withoutAddon, ...props }: ISearchInputProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Search
      className={ cn({ className, [styles.searchWithoutAddon]: withoutAddon }) }
      { ...props }
    />
  )
}

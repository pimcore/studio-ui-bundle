/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties, forwardRef } from 'react'
import { type SearchProps as AntSearchProps } from 'antd/es/input/Search'
import { Input, type InputRef } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './search-input.styles'

export interface ISearchInputProps extends AntSearchProps {
  className?: string
  withoutAddon?: boolean
  withPrefix?: boolean
  withClear?: boolean
  maxWidth?: CSSProperties['maxWidth']
  searchButtonIcon?: string
}

export const SearchInput = forwardRef<InputRef, ISearchInputProps>(({ className, withoutAddon = false, withPrefix = false, withClear = true, maxWidth = 320, searchButtonIcon = 'search', ...props }, ref): React.JSX.Element => {
  const { styles } = useStyles()

  const searchClassNames = cn(
    styles.search,
    {
      [styles.searchWithoutAddon]: withoutAddon
    },
    className
  )

  const dataTestId = props['data-testid']

  return (
    <Input.Search
      allowClear={ (withClear) && {
        clearIcon: (
          <Icon
            className={ styles.closeIcon }
            value='close'
          />
        )
      } }
      className={ searchClassNames }
      data-testid={ dataTestId }
      enterButton={ !withoutAddon && (
        <Icon
          value={ searchButtonIcon }
        />
      ) }
      prefix={ (withPrefix) && (
        <Icon
          className={ styles.searchIcon }
          options={ { width: 12, height: 12 } }
          value='search'
        />
      ) }
      ref={ ref }
      style={ { maxWidth } }
      { ...props }
    />
  )
})

SearchInput.displayName = 'SearchInput'

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties } from 'react'
import { type SearchProps as AntSearchProps } from 'antd/es/input/Search'
import { Input } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './search-input.styles'

export interface ISearchInputProps extends AntSearchProps {
  className?: string
  withoutAddon?: boolean
  withPrefix?: boolean
  withClear?: boolean
  maxWidth?: CSSProperties['maxWidth']
}

export const SearchInput = ({ className, withoutAddon = false, withPrefix = false, withClear = true, maxWidth = 320, ...props }: ISearchInputProps): React.JSX.Element => {
  const { styles } = useStyles()

  const searchClassNames = cn(
    styles.search,
    {
      [styles.searchWithoutAddon]: withoutAddon
    },
    className
  )

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
      prefix={ (withPrefix) && (
        <Icon
          className={ styles.searchIcon }
          options={ { width: 12, height: 12 } }
          value='search'
        />
      ) }
      style={ { maxWidth } }
      { ...props }
    />
  )
}

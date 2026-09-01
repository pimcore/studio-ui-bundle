/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import classNames from 'classnames'
import { Box, type BoxProps } from '@Pimcore/components/box/box'
import { Filename } from '@Pimcore/components/filename/filename'

export interface ISearchResultItemProps extends Omit<BoxProps, 'children'> {
  item: SimpleSearchResult
  active?: boolean
  first?: boolean
}

export const SearchResultItem = (props: ISearchResultItemProps): React.JSX.Element => {
  const { item, active, first, ...htmlProps } = props
  const { icon, path } = item
  const { openElement, mapToElementType } = useElementHelper()
  const { close } = useSearch()

  const className = classNames(
    'hover',
    {
      active: active === true
    }
  )

  const onClick = (): void => {
    const mappedType = mapToElementType(item.elementType)

    if (mappedType === undefined) {
      return
    }

    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    openElement({
      id: item.id,
      type: mappedType
    })

    close()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLOrSVGElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onClick()
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = (event.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null
      next?.focus()
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = (event.currentTarget as HTMLElement).previousElementSibling as HTMLElement | null
      prev?.focus()
    }
  }

  return (
    <Box
      { ...htmlProps }
      className={ className }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      padding={ 'mini' }
      role="option"
      tabIndex={ (active === true || first === true) ? 0 : -1 }
    >
      <Flex
        align="center"
        gap={ 'mini' }
      >
        <Icon { ...icon } />
        <Filename
          ellipsis={ !(active ?? false) }
          value={ path }
        />
      </Flex>
    </Box>
  )
}

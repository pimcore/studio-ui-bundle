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

import { Flex } from '@Pimcore/components/flex/flex'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import classNames from 'classnames'
import { Box, type BoxProps } from '@Pimcore/components/box/box'
import { Filename } from '@Pimcore/components/filename/filename'

export interface ISearchResultItemProps extends Omit<BoxProps, 'children'> {
  item: SimpleSearchResult
  active?: boolean
}

export const SearchResultItem = (props: ISearchResultItemProps): React.JSX.Element => {
  const { item, active, ...htmlProps } = props
  const { icon, path } = item
  const { openElement } = useElementHelper()
  const { close } = useSearch()

  const className = classNames(
    'hover',
    {
      active: active === true
    }
  )

  const onClick = (): void => {
    /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
    openElement({
      id: item.id,
      type: item.elementType as unknown as ElementType
    })

    close()
  }

  return (
    <Box
      { ...htmlProps }
      className={ className }
      onClick={ onClick }
      padding={ 'mini' }
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

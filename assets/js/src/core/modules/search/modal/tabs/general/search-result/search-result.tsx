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

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchTerm } from '../provider/use-search-term'
import { useSimpleSearchGetQuery } from '@Pimcore/modules/search/search-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { SearchResultItem } from './search-result-item'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination, type PaginationProps } from '@Pimcore/components/pagination/pagination'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { Flex } from '@Pimcore/components/flex/flex'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { SearchResultDetail } from './detail/search-result-detail'
import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'

export const SearchResult = (): React.JSX.Element => {
  const { searchTerm } = useSearchTerm()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [selectedItem, setSelectedItem] = useState<SimpleSearchResult | undefined>(undefined)
  const [selectedItemQuery, setSelectedItemQuery] = useState<SimpleSearchResult | undefined>(undefined)
  const { isLoading, isError, error, data } = useSimpleSearchGetQuery({ searchTerm, page, pageSize })

  useEffect(() => {
    const timerId = setTimeout(() => { setSelectedItem(selectedItemQuery) }, 333)
    return () => { clearTimeout(timerId) }
  }, [selectedItemQuery])

  useEffect(() => {
    setPage(1)
    setSelectedItem(undefined)
  }, [searchTerm])

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
    setSelectedItem(undefined)
  }

  const onMouseEnter = (item: SimpleSearchResult): void => {
    setSelectedItemQuery(item)
  }

  const onMouseLeave = (): void => {
    setSelectedItemQuery(selectedItem)
  }

  const detectItemActivity = (item): boolean => {
    return selectedItem?.id === item.id && selectedItem?.elementType === item.elementType
  }

  return useMemo(() => {
    if (isLoading) {
      return <Content loading />
    }

    return (
      <>
        <div />

        <SplitLayout
          leftItem={
            {
              size: 750,
              children: (
                <Content
                  overflow={ { x: 'hidden', y: 'auto' } }
                  padded
                  padding={ { left: 'none', right: 'none', y: 'none' } }
                  style={ { height: 400 } }
                >
                  <Flex
                    className='w-full h-full'
                    gap={ 0 }
                    vertical
                  >
                    {data?.items.map((item) => (
                      <SearchResultItem
                        active={ detectItemActivity(item) }
                        item={ item }
                        key={ `${item.id}-${item.elementType}` }
                        onMouseEnter={ () => { onMouseEnter(item) } }
                        onMouseLeave={ () => { onMouseLeave() } }
                      />
                    ))}

                    {data?.items.length === 0 && (
                      <Flex
                        align='center'
                        className='w-full h-full'
                        gap={ 'mini' }
                        justify='center'
                        vertical
                      >
                        <NoContent text='No results found' />
                      </Flex>
                    )}
                  </Flex>
                </Content>
              )
            }
          }

          rightItem={
            {
              size: 250,
              minSize: 250,
              maxSize: 250,
              children: (
                <SearchResultDetail item={ selectedItem } />
              )
            }
          }

          withDivider
        />

        <Toolbar theme='secondary'>
          <Pagination
            onChange={ onChange }
            pageSizeOptions={ [10, 20, 50, 100] }
            showSizeChanger
            showTotal={ (total) => `Total ${total} items` }
            total={ data?.totalItems ?? 0 }
          />
        </Toolbar>
      </>
    )
  }, [data, selectedItem, isLoading])
}

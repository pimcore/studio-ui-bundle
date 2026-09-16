/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Content } from '@Pimcore/components/content/content'
import { SearchResultItem } from './search-result-item'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination, type PaginationProps } from '@Pimcore/components/pagination/pagination'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { Flex } from '@Pimcore/components/flex/flex'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { SearchResultDetail } from './detail/search-result-detail'
import { type SimpleSearchResult } from '@Pimcore/modules/search/search-api-slice.gen'

export interface SearchResultListProps {
  data: { totalItems: number, items: SimpleSearchResult[] } | undefined
  isLoading: boolean
  /** Replaces the empty-state text when the data source failed. */
  errorText?: string
  onPageChange: (page: number, pageSize: number) => void
  /** Changing it clears the hover selection (new term or mode). */
  resetKey: string
}

/** List, hover detail and pagination of the All tab; the caller owns data source and paging. */
export const SearchResultList = ({ data, isLoading, errorText, onPageChange, resetKey }: SearchResultListProps): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<SimpleSearchResult | undefined>(undefined)
  const [selectedItemQuery, setSelectedItemQuery] = useState<SimpleSearchResult | undefined>(undefined)

  useEffect(() => {
    const timerId = setTimeout(() => { setSelectedItem(selectedItemQuery) }, 333)
    return () => { clearTimeout(timerId) }
  }, [selectedItemQuery])

  useEffect(() => {
    setSelectedItem(undefined)
  }, [resetKey])

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    setSelectedItem(undefined)
    onPageChange(page, pageSize)
  }

  const detectItemActivity = (item: SimpleSearchResult): boolean => {
    return selectedItem?.id === item.id && selectedItem?.elementType === item.elementType
  }

  if (isLoading) {
    return <Content loading />
  }

  return (
    <div style={ { display: 'flex', flexDirection: 'column', height: '100%' } }>
      <div style={ { flex: 1, overflow: 'hidden', minHeight: 0 } }>
        <SplitLayout
          leftItem={
          {
            size: 750,
            children: (
              <Content
                overflow={ { x: 'hidden', y: 'auto' } }
                padded
                padding={ { left: 'none', right: 'none', y: 'none' } }
                style={ { height: '100%' } }
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
                      onMouseEnter={ () => { setSelectedItemQuery(item) } }
                      onMouseLeave={ () => { setSelectedItemQuery(selectedItem) } }
                    />
                  ))}

                  {(errorText !== undefined || data?.items.length === 0) && (
                    <Flex
                      align='center'
                      className='w-full h-full'
                      gap={ 'mini' }
                      justify='center'
                      vertical
                    >
                      <NoContent text={ errorText ?? 'No results found' } />
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
      </div>

      <Toolbar
        padding={ { left: 'none', right: 'none' } }
        theme='secondary'
      >
        <Pagination
          onChange={ onChange }
          pageSizeOptions={ [10, 20, 50, 100] }
          showSizeChanger
          showTotal={ (total) => `Total ${total} items` }
          total={ data?.totalItems ?? 0 }
        />
      </Toolbar>
    </div>
  )
}

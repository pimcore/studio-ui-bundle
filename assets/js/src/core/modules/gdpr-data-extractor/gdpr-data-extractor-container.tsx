import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { Split } from "@Pimcore/components/split/split"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { debounce } from "lodash"
import { ColumnFilter } from "../app/types/column-filter"
import { SortFilter } from "../app/types/sort-filter"
import { SearchForm } from "./components/search-form/search-form"
import { Tabpanel } from "./components/tab-panel/tab-panel"
import { useLazyGdprSearchDataQuery } from "./gdpr-data-extractor-slice-enhanced"
import { isEmpty } from "lodash"

export interface SearchOverrides {
  provider?: string,
  columnFilters?: ColumnFilter[]
}

export const GDPRDataExtractorContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [sortFilter, setSortFilter] = useState<SortFilter>({ key: 'id', direction: 'ASC' })
  const [provider, setProvider] = useState<string>('data_objects')

  const [trigger, { data, isLoading, isFetching }] = useLazyGdprSearchDataQuery()

  const debouncedSetColumnFilters = useMemo(
    () => debounce((filters: ColumnFilter[]) => {
      setColumnFilters(filters)
    }, 300),
    []
  )

  const executeSearch = (overrides?: SearchOverrides): void => {
    const currentProvider = overrides?.provider ?? provider
    const currentColumnFilters = overrides?.columnFilters ?? columnFilters

    if (currentProvider === '' || isEmpty(currentColumnFilters)) return

    trigger({
      provider: currentProvider,
      body: {
        filters: {
          page,
          pageSize,
          columnFilters: currentColumnFilters,
          sortFilter
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          padding={{
            x: 'small',
            y: 'extra-small'
          }}
          theme="secondary"
          justify="end"
        >
          <Flex align="center">
            <Split>
              <IconButton
                disabled={isLoading || isFetching || provider === ''}
                icon={{ value: 'refresh' }}
                onClick={() => executeSearch()}
              />
              <Pagination
                current={page}
                onChange={(page, pageSize) => {
                  setPage(page)
                  setPageSize(pageSize)
                }}
                showSizeChanger
                showTotal={(total) => t('pagination.show-total', { total })}
                total={data?.totalItems ?? 0}
                hideOnSinglePage
              />
            </Split>
          </Flex>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={{
            x: 'mini',
            y: 'none'
          }}
          theme='secondary'
        >
          <Flex gap={4}>
            <Title>
              {t('gdpr-extractor.title')}
            </Title>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        gap={'extra-small'}
        padded
        padding={{
          x: 'extra-small',
          y: 'extra-small'
        }}
      >
        <SearchForm
          isLoading={isLoading || isFetching}
          onValueChange={(filters) => {
            debouncedSetColumnFilters(filters)
          }}
          onSearch={(columnFilters) => {
            setColumnFilters(columnFilters)
            executeSearch({ columnFilters })
          }}
        />
        <Tabpanel
          isLoading={isLoading || isFetching}
          data={data?.items}
          onProviderChange={(providerKey) => {
            setProvider(providerKey)
            executeSearch({ provider: providerKey })
          }}
          refresh={executeSearch}
        />
      </Content>
    </ContentLayout>
  )
}
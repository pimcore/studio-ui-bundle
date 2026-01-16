import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { Split } from "@Pimcore/components/split/split"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useGdprSearchDataQuery } from "./gdpr-data-extractor-api-slice.gen"
import { ColumnFilter } from "../app/types/column-filter"
import { SortFilter } from "../app/types/sort-filter"
import { SearchForm } from "./components/search-form/search-form"
import { Tabpanel } from "./components/tab-panel/tab-panel"

export const GDPRDataExtractorContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [sortFilter, setSortFilter] = useState<SortFilter>({ key: 'id', direction: 'ASC' })
  const [provider, setProvider] = useState<string>('')

  const { data, isLoading, isFetching, refetch } = useGdprSearchDataQuery({
    provider,
    body: {
      filters: {
        page,
        pageSize,
        columnFilters,
        sortFilter
      }
    }
  })

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
            <Split> {/* TODO: Why does the Split doesnt hide itself if pagination is hidden via hideOnSinglePage */}
              <IconButton
                disabled={isLoading || isFetching}
                icon={{ value: 'refresh' }}
                onClick={() => {
                  //refetch()
                }}
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
          onSearch={(columnFilters) => {
            setColumnFilters(columnFilters)
            //refetch()
          }}
        />

        <Tabpanel
          data={data?.items}
          onProviderChange={setProvider}
        />
      </Content>
    </ContentLayout>
  )
}
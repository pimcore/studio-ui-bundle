import { Box } from "@Pimcore/components/box/box"
import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { SearchInput } from "@Pimcore/components/search-input/search-input"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useRecycleBinGetCollectionQuery } from "./recycle-bin-api-slice.gen"
import { useAppDispatch } from "@sdk/app"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { Table } from "./components/table/table"

export const RecycleBinContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data, isLoading: isRTKLoading, isFetching } = useRecycleBinGetCollectionQuery({
    body: {
      filters: {
        page: currentPage,
        pageSize
      }
    }
  })
  const total = data?.totalItems ?? 0

  const onPagerChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
    }
  }, [isFetching])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={isRTKLoading || isLoading}
            icon={{ value: 'refresh' }}
            onClick={() => {
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.EMAIL_LOG()
                )
              )
            }}
          />
          <Pagination
            current={currentPage}
            defaultPageSize={pageSize}
            onChange={onPagerChange}
            showSizeChanger
            showTotal={(total) => t('pagination.show-total', { total })}
            total={total}
          />
        </Toolbar>}
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={{
            x: 'mini',
            y: 'none'
          }}
          theme='secondary'
        >
          <Flex gap={'small'}>
            <Title>{t('widget.recycle-bin')}</Title>
          </Flex>
          <SearchInput
            loading={isFetching}
            onSearch={(value) => {
              setFilter(value)
            }}
            placeholder="Search"
            withPrefix={false}
            withoutAddon={false}
          />
        </Toolbar>
      }
    >
      <Content
        loading={isRTKLoading || isFetching}
        margin={{
          x: 'extra-small',
          y: 'none'
        }}
        none={isUndefined(data?.items) || data.items.length === 0}
      >
        <Box
          margin={{
            x: 'extra-small',
            y: 'none'
          }}
        >
          <Table
            items={data?.items ?? []}
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
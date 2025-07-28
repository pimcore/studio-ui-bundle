import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"
import { Box } from "@Pimcore/components/box/box"
import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { SearchInput } from "@Pimcore/components/search-input/search-input"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { useAppDispatch } from "@sdk/app"
import { Divider, IconTextButton } from "@sdk/components"
import { isUndefined } from "lodash"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { BatchActions } from "./components/batch-actions/batch-actons"
import { RowSelectionTotal } from "./components/row-selection-total/row-selection-total"
import { Table } from "./components/table/table"
import { useSelectedRowsContext } from "./context/selected-items-context"
import { useRecycleBin } from "./hooks/use-recycle-bin"
import { api } from "./recycle-bin-api-slice-enhanced"
import { useRecycleBinGetCollectionQuery } from "./recycle-bin-api-slice.gen"

interface ColumnFilters {
  path: {
    key: string,
    type: string,
    filterValue: string
  }
}

export const RecycleBinContainerInner = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [columnFilters, setColumnFilters] = useState<ColumnFilters | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { flush } = useRecycleBin()
  const { selectedRows } = useSelectedRowsContext()
  const { data, isLoading: isRTKLoading, isFetching } = useRecycleBinGetCollectionQuery({
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters
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
          {selectedRows && Object.keys(selectedRows).length > 0 ? (
            <Flex>
              <RowSelectionTotal />
              <BatchActions />
            </Flex>
          ) : (
            <IconTextButton
              disabled={isRTKLoading || isLoading}
              icon={{ value: 'trash' }}
              onClick={() => {
                setIsLoading(true)
                flush(() => {
                  dispatch(
                    api.util.invalidateTags(
                      invalidatingTags.RECYCLING_BIN()
                    )
                  )

                  setIsLoading(false)
                })
              }}
              type={"link"}
            >
              {t('recycle-bin.actions.cleanup')}
            </IconTextButton>
          )}

          <Flex align="center">
            <IconButton
              disabled={isRTKLoading || isLoading}
              icon={{ value: 'refresh' }}
              onClick={() => {
                dispatch(
                  api.util.invalidateTags(
                    invalidatingTags.RECYCLING_BIN()
                  )
                )
              }}
            />

            {total > 0 && (
              <>
                <Divider
                  type="vertical"
                  size="small"
                />

                <Pagination
                  current={currentPage}
                  defaultPageSize={pageSize}
                  onChange={onPagerChange}
                  showSizeChanger
                  showTotal={(total) => t('pagination.show-total', { total })}
                  total={total}
                />
              </>
            )}
          </Flex>
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
            loading={isFetching || isLoading}
            onSearch={(value) => {
              const pathFilter: ColumnFilters['path'] = {
                key: 'path',
                type: 'like',
                filterValue: ''
              }

              if (value !== '') {
                pathFilter.filterValue = value
              }

              setColumnFilters({
                ...columnFilters,
                path: pathFilter
              })
            }}
            placeholder={t('component.search.pleaceholder')}
            withPrefix={false}
            withoutAddon={false}
          />
        </Toolbar>
      }
    >
      <Content
        loading={isLoading || isRTKLoading}
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
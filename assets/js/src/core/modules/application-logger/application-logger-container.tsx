import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { SearchInput } from "@Pimcore/components/search-input/search-input"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { isUndefined } from "lodash"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useBundleApplicationLoggerGetCollectionQuery } from "./application-logger-api-slice.gen"
import { useAppDispatch } from "@sdk/app"
import { api } from '@Pimcore/modules/application-logger/application-logger-api-slice-enhanced'
import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"

export const ApplicationLogger = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data, isLoading: isRTKLoading } = useBundleApplicationLoggerGetCollectionQuery({
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

  //TODO: move to hook
  const [filter, setFilter] = useState<string>('')

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            disabled={isLoading || isRTKLoading}
            icon={{ value: 'refresh' }}
            onClick={() => {
              setIsLoading(true)
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.APPLICATION_LOGGER()
                )
              )
              setIsLoading(false)
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
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={{
            x: 'mini',
            y: 'none'
          }
          }
          theme='secondary'
        >
          <Title>{t('notes-and-events.label')}</Title>
          <SearchInput
            loading={isRTKLoading}
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
        loading={isLoading}
        none={isUndefined(data?.items) || data.items.length === 0}
        padded
      >
        {data?.items !== undefined && data?.items?.length > 0
          ? (
            data.items.map((item) => (
              <EmailCard
                entry={item}
                key={item.email}
              />
            ))
          )
          : ''}
      </Content>
    </ContentLayout>
  )
}
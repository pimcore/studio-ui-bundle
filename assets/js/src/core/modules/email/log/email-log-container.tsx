import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"
import { useAppDispatch } from "@Pimcore/app/store"
import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { Pagination } from "@Pimcore/components/pagination/pagination"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { isUndefined } from "lodash"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useEmailLogGetCollectionQuery } from "../emails-api-slice.gen"
import { EmailCard } from "./components/email-card/email-card"

export const EmailLogContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data, isLoading: isRTKLoading } = useEmailLogGetCollectionQuery({
    page: currentPage,
    pageSize
  })
  const total = data?.totalItems ?? 0

  const onPagerChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            disabled={isRTKLoading || isLoading}
            icon={{ value: 'refresh' }}
            onClick={() => {
              setIsLoading(true)
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.EMAIL_LOG()
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
          }}
          theme='secondary'
        >
          <Flex gap={'small'}>
            <Title>
              {t('widget.email-log')}
            </Title>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        loading={isRTKLoading || isLoading}
        none={isUndefined(data?.items) || data.items.length === 0}
        padded
      >
        {!isUndefined(data?.items) && <EmailCard emails={data!.items} />}
      </Content>
    </ContentLayout>
  )
}
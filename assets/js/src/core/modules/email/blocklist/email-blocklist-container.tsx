import { useAppDispatch } from "@Pimcore/app/store"
import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { api } from "@Pimcore/modules/email/emails-api-slice-enhanced"
import { invalidatingTags } from "@sdk/api"
import { Icon, Pagination } from "@sdk/components"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useEmailBlocklistGetCollectionQuery } from "../emails-api-slice.gen"
import { EmailCard } from "./components/email-card/email-card"
import { useEmailBlocklist } from "./hooks/use-email-blocklist"

export const EmailBlocklistContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { addNewEmail } = useEmailBlocklist()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const { data, isLoading } = useEmailBlocklistGetCollectionQuery({
    page: currentPage,
    pageSize
  })
  const total = data?.totalItems ?? 0

  function onPagerChange(page: number, pageSize: number): void {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentLayout
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
            <Title
              icon={<Icon value="users-x" />}
            >
              {t('widget.email-blocklist')}
            </Title>
            <IconTextButton
              icon={{ value: 'new' }}
              onClick={() => void addNewEmail()}
            >{t('email-blocklist.add')}</IconTextButton>
          </Flex>
        </Toolbar>
      }
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            icon={{ value: 'refresh' }}
            onClick={() => {
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.EMAIL_BLOCKLIST()
                )
              )
            }
            }
          />
          <Pagination
            current={currentPage}
            defaultPageSize={pageSize}
            onChange={onPagerChange}
            total={total}
            showSizeChanger
            showTotal={(total) => t('pagination.show-total', { total })}
          />
        </Toolbar>
      }
    >
      <Content
        padded
        loading={isLoading}
      >
        {data?.items && data.items.length > 0 ? (
          data.items.map((item) => (
            <EmailCard key={item.email} entry={item} />
          ))
        ) : ''}
      </Content>
    </ContentLayout>
  )
}
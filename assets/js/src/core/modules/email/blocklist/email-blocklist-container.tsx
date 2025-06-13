import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { Header } from "@Pimcore/components/header/header"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { Alert, Card, Icon } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"
import { useEmailBlocklist } from "./hooks/use-email-blocklist"
import { useEmailBlocklistGetCollectionQuery } from "../emails-api-slice.gen"
import { EmailCard } from "./components/email-card/email-card"

export const EmailBlocklistContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { addNewEmail } = useEmailBlocklist()
  const { isLoading, data } = useEmailBlocklistGetCollectionQuery({ page: 1, pageSize: 50 })

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
              onClick={() => addNewEmail()}
            >{t('email-blocklist.add')}</IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        padded
        loading={isLoading}
      >
        {data?.items && data.items.length > 0 ? (
          data.items.map((item) => (
            <EmailCard entry={item} />
          ))
        ) : ''}
      </Content>
    </ContentLayout>
  )
}
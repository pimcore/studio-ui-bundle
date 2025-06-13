import { ContentLayout } from "@Pimcore/components/content-layout/content-layout"
import { Content } from "@Pimcore/components/content/content"
import { Flex } from "@Pimcore/components/flex/flex"
import { Header } from "@Pimcore/components/header/header"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button"
import { Title } from "@Pimcore/components/title/title"
import { Toolbar } from "@Pimcore/components/toolbar/toolbar"
import { Icon } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"

export const EmailBlocklistContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

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
            >{t('email-blocklist.add')}</IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content>Test</Content>
    </ContentLayout>
  )
}
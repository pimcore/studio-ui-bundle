import { Button, Content, ContentLayout, DateRangePicker, Form, IconButton, IconTextButton, Space, Title, Toolbar } from "@sdk/components"
import { Flex } from "antd"
import React from "react"
import { useTranslation } from "react-i18next"

export const FilterTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon={{ value: 'close' }}
            onClick={() => console.log('clear filters')}
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={() => console.log('apply')}
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Form
          form={form}
          layout="vertical"
        >
          <Space
            direction='vertical'
            style={{ width: '100%' }}
          >
            <Title>{t('application-logger.sidebar.search-parameter')}</Title>

            <Form.Item
              name="DateRangePicker"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <DateRangePicker />
            </Form.Item>

            <Title>{t('element.sidebar.field-filters')}</Title>
          </Space>
        </Form>

      </Content>
    </ContentLayout>
  )
}
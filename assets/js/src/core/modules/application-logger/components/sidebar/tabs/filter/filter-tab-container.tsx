import { Button, Content, ContentLayout, DateRangePicker, Form, IconTextButton, Space, Title, Toolbar } from "@sdk/components"
import dayjs from 'dayjs'
import React from "react"
import { useTranslation } from "react-i18next"
import { useFilter } from "./provider/filter-provider/use-filter"

export const FilterTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const {
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    resetFilters,
    updateFilters
  } = useFilter()

  const convertValueToISOFormat = (timestamp: number | null): string | null => {
    if (timestamp === null) return null

    return dayjs.unix(timestamp).format()
  }

  const convertISOToTimestamp = (dateStr: string | null): number | null => {
    if (dateStr === null) return null

    return dayjs(dateStr).startOf('day').unix()
  }

  const handleResetFilters = (): void => {
    resetFilters()
    form.resetFields()
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon={{ value: 'close' }}
            onClick={handleResetFilters}
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={updateFilters}
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
              <DateRangePicker
                allowEmpty={[true, true]}
                format={'YYYY-MM-DD'}
                onChange={(value: unknown) => {
                  const [newFrom, newTo] = value as [number | null, number | null]

                  setDateFrom(convertValueToISOFormat(newFrom))
                  setDateTo(convertValueToISOFormat(newTo))
                }}
                value={[convertISOToTimestamp(dateFrom), convertISOToTimestamp(dateTo)]}
              />
            </Form.Item>
          </Space>
        </Form>

      </Content>
    </ContentLayout>
  )
}
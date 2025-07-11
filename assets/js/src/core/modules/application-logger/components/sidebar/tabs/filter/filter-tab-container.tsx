import { Button, Content, ContentLayout, DatePicker, Form, IconTextButton, Input, Space, Title, Toolbar } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"
import { ComponentSelect } from "./components/component-select/component-select"
import { PrioritySelect } from "./components/priority-select/priority-select"
import { useFilter } from "./provider/filter-provider/use-filter"

const DATE_FORMAT = 'YYYY-MM-DD HH:mm'

export const FilterTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const {
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    relatedObjectId,
    setRelatedObjectId,
    message,
    setMessage,
    pid,
    setPid,
    resetFilters,
    updateFilters
  } = useFilter()

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
            size="none"
            direction='vertical'
            style={{ width: '100%' }}
          >
            <Title>{t('application-logger.sidebar.search-parameter')}</Title>

            <Form.Item
              label={t('application-logger.filter.date-from')}
              name="dateFrom"
            >
              <DatePicker
                className="w-full"
                format={DATE_FORMAT}
                onChange={(value: string) => {
                  setDateFrom(value)
                }}
                outputType="dateString"
                showTime={{ format: 'HH:mm' }}
                value={dateFrom}
              />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.date-to')}
              name="dateTo"
            >
              <DatePicker
                className="w-full"
                format={DATE_FORMAT}
                onChange={(value: string) => {
                  setDateTo(value)
                }}
                outputType="dateString"
                showTime={{ format: 'HH:mm' }}
                value={dateTo}
              />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.priority')}
              name="priority"
            >
              <PrioritySelect />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.component')}
              name="component"
            >
              <ComponentSelect />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.related-object-id')}
              name="relatedObjectId"
            >
              <Input
                type="number"
                min="0"
                step="1"
                value={relatedObjectId ?? undefined}
                onChange={(e) => {
                  const value = e.target.value
                  setRelatedObjectId(value ? parseInt(value) : null)
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.message')}
              name="message"
            >
              <Input
                value={message ?? undefined}
                onChange={(e) => {
                  const value = e.target.value
                  setMessage(value ?? null)
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('application-logger.filter.pid')}
              name="pid"
            >
              <Input
                type="number"
                min="0"
                step="1"
                value={pid ?? undefined}
                onChange={(e) => {
                  const value = e.target.value
                  setPid(value ? parseInt(value) : null)
                }}
              />
            </Form.Item>
          </Space>
        </Form>

      </Content>
    </ContentLayout>
  )
}
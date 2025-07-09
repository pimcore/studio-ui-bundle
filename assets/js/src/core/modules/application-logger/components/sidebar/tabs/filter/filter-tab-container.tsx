import { Button, Content, ContentLayout, DateRangePicker, Form, IconTextButton, Space, Title, Toolbar } from "@sdk/components"
import dayjs from 'dayjs'
import React from "react"
import { useTranslation } from "react-i18next"
import { useFilter } from "./provider/filter-provider/use-filter"
import { useAppDispatch } from "@sdk/app"
import { api } from '@Pimcore/modules/application-logger/application-logger-api-slice-enhanced'
import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"

export const FilterTabContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const {
    setDateFrom,
    setDateTo
  } = useFilter()

  const handleApplyClick = (): void => {
    // Invalidate the APPLICATION_LOGGER tags to trigger a refetch with new filters
    dispatch(
      api.util.invalidateTags(
        invalidatingTags.APPLICATION_LOGGER()
      )
    )
  }

  const handleClearFiltersClick = (): void => {
    // Clear the date filters
    setDateFrom(null)
    setDateTo(null)
    // Reset the form
    form.resetFields()
    // Invalidate tags to refetch with cleared filters
    dispatch(
      api.util.invalidateTags(
        invalidatingTags.APPLICATION_LOGGER()
      )
    )
  }

  const convertValueToISOFormat = (timestamp: number | null): string | null => {
    if (timestamp === null) return null

    return dayjs.unix(timestamp).format()
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon={{ value: 'close' }}
            onClick={handleClearFiltersClick}
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={handleApplyClick}
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
              />
            </Form.Item>
          </Space>
        </Form>

      </Content>
    </ContentLayout>
  )
}
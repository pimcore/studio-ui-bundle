/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button, Content, ContentLayout, DatePicker, Form, IconTextButton, Input, Space, Title, Toolbar } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ComponentSelect } from './components/component-select/component-select'
import { PrioritySelect } from './components/priority-select/priority-select'
import { useFilter } from './provider/filter-provider/use-filter'

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
            icon={ { value: 'close' } }
            onClick={ handleResetFilters }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={ updateFilters }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Form
          form={ form }
          layout="vertical"
        >
          <Space
            direction='vertical'
            size="none"
            style={ { width: '100%' } }
          >
            <Title>{t('application-logger.sidebar.search-parameter')}</Title>

            <Form.Item
              label={ t('application-logger.filter.date-from') }
              name="dateFrom"
            >
              <DatePicker
                className="w-full"
                format={ DATE_FORMAT }
                onChange={ (value: string) => {
                  setDateFrom(value)
                } }
                outputType="dateString"
                showTime={ { format: 'HH:mm' } }
                value={ dateFrom }
              />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.date-to') }
              name="dateTo"
            >
              <DatePicker
                className="w-full"
                format={ DATE_FORMAT }
                onChange={ (value: string) => {
                  setDateTo(value)
                } }
                outputType="dateString"
                showTime={ { format: 'HH:mm' } }
                value={ dateTo }
              />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.priority') }
              name="priority"
            >
              <PrioritySelect />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.component') }
              name="component"
            >
              <ComponentSelect />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.related-object-id') }
              name="relatedObjectId"
            >
              <Input
                min="0"
                onChange={ (e) => {
                  const value = e.target.value
                  setRelatedObjectId(value !== '' ? parseInt(value) : null)
                } }
                step="1"
                type="number"
                value={ relatedObjectId ?? undefined }
              />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.message') }
              name="message"
            >
              <Input
                onChange={ (e) => {
                  const value = e.target.value
                  setMessage(value ?? null)
                } }
                value={ message ?? undefined }
              />
            </Form.Item>

            <Form.Item
              label={ t('application-logger.filter.pid') }
              name="pid"
            >
              <Input
                min="0"
                onChange={ (e) => {
                  const value = e.target.value
                  setPid(value !== '' ? parseInt(value) : null)
                } }
                step="1"
                type="number"
                value={ pid ?? undefined }
              />
            </Form.Item>
          </Space>
        </Form>

      </Content>
    </ContentLayout>
  )
}

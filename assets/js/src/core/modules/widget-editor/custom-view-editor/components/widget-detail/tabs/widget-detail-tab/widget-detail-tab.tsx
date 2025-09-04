/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@Pimcore/components/form/form-kit'
import { useWidgetEditorContext } from '@Pimcore/modules/widget-editor/custom-view-editor/context/hooks/use-widget-editor-context'
import { useWidgetEditor } from '@Pimcore/modules/widget-editor/custom-view-editor/hooks/use-widget-editor'
import { Button, Content, Flex, Form, IconButton, Input, Toolbar } from '@sdk/components'
import { type FormInstance } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface WidgetForm {
  name: string
}

interface WidgetDetailTabProps {
  id: string
}

export const WidgetDetailTab = ({ id }: WidgetDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { widgets, setWidgets, setIsLoading, isLoading } = useWidgetEditorContext()
  const { updateWidget, removeWithConfirmation } = useWidgetEditor()
  const widget = widgets.find(w => w.id === id)
  const [form] = Form.useForm<FormInstance<WidgetForm>>()
  const initialValues: WidgetForm = {
    name: widget?.name ?? ''
  }
  const [formData, setFormData] = useState<WidgetForm>(initialValues)

  if (widget === undefined) {
    return <></>
  }

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onFinish: async (values: WidgetForm) => {
          console.table(values)
          setIsLoading(true)

          await updateWidget(widget.id, widget.widgetType, {
            ...values as any
          }, () => {
            setWidgets((prev) => {
              const updated = prev.map((w) => (w.id === id ? { ...w, ...values } : w))
              return updated
            })
          })
            .finally(() => {
              setIsLoading(false)
            })
        }
      } }
    >
      <Flex
        className='makeTabsGreatAgain'
        justify='space-between'
        vertical
      >
        <Content
          padded
          padding={ {
            x: 'small',
            y: 'none'
          } }
        >
          <FormKit.Panel>
            <Form.Item
              label="Name"
              name="name"
              required
            >
              <Input
                onChange={ (e) => { setFormData({ ...formData, name: e.target.value }) } }
                placeholder={ t('widget-editor.form.name.placeholder') }
              />
            </Form.Item>
          </FormKit.Panel>
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              disabled={ isLoading }
              icon={ { value: 'refresh' } }
              onClick={ () => {
                form.resetFields()
              } }
              title={ t('refresh') }
            />

            <IconButton
              disabled={ isLoading }
              icon={ { value: 'trash' } }
              onClick={ () => {
                removeWithConfirmation(widget.id, widget.widgetType, () => {
                  setWidgets((prev) => prev.filter((w) => w.id !== widget.id))
                })
              } }
              title={ t('delete') }
            />
          </div>

          <Button
            htmlType='submit'
            loading={ isLoading }
            type='primary'
          >
            {t('save')}
          </Button>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}

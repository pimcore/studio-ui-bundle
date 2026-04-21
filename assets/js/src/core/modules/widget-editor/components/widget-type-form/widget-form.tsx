/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type ElementTreeWidget } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { isArray, isUndefined } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetEditorActions } from '../../context/hooks/use-widget-editor-context'
import { useWidgetEditor } from '../../hooks/use-widget-editor'
import { GeneralTab } from './components/general-tab/general-tab'
import { useWidgetFormContext } from './context/hooks/use-widget-form-context'

interface WidgetFormProps {
  form: React.ComponentType
}

const convertClassesArrayToObject = (classes: object | undefined): Record<string, boolean> => {
  if (isUndefined(classes) || !isArray(classes)) {
    return {}
  }

  return classes.reduce((acc: Record<string, boolean>, classId: string) => {
    acc[classId] = true
    return acc
  }, {})
}

export const WidgetForm = ({ form: TypeSpecificForm }: WidgetFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { form, widget } = useWidgetFormContext()
  const { setWidgets, closeWidget } = useWidgetEditorActions()
  const { removeWithConfirmation, updateWidget, getWidgetById, isLoading } = useWidgetEditor()
  const isWriteable = widget.isWriteable !== false

  const elementTreeWidget = widget as ElementTreeWidget

  const onFinish = useCallback(async (values: any): Promise<void> => {
    await updateWidget(widget.id, widget.widgetType, values)
  }, [widget.id, widget.widgetType, updateWidget])

  const initialValues = useMemo(() => ({
    ...elementTreeWidget,
    classes: convertClassesArrayToObject(elementTreeWidget.classes)
  }), [elementTreeWidget])

  const formProps = useMemo(() => ({
    form,
    layout: 'vertical' as const,
    initialValues,
    onFinish
  }), [form, initialValues, onFinish])

  return (
    <FormKit
      formProps={ formProps }
    >
      <Flex
        className='absolute-stretch'
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
          <GeneralTab />
          <TypeSpecificForm />
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              data-testid="widget-form-refresh-button"
              disabled={ isLoading }
              icon={ { value: 'refresh' } }
              onClick={ async () => {
                const newWidgetData = await getWidgetById(widget.id, widget.widgetType)

                if (newWidgetData !== undefined) {
                  setWidgets((prev) => prev.map((w) => w.id === widget.id ? newWidgetData : w))
                  form.resetFields(['classes'])
                  form.setFieldsValue({
                    ...newWidgetData,
                    classes: convertClassesArrayToObject((newWidgetData as ElementTreeWidget).classes)
                  })
                }
              } }
              title={ t('refresh') }
            />

            <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
              <IconButton
                data-testid="widget-form-delete-button"
                disabled={ isLoading || !isWriteable }
                icon={ { value: 'trash' } }
                onClick={ () => {
                  removeWithConfirmation(widget.id, widget.widgetType, () => {
                    closeWidget(widget.id)
                    setWidgets((prev) => prev.filter((w) => w.id !== widget.id))
                  })
                } }
                title={ t('delete') }
              />
            </Tooltip>
          </div>

          <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
            <Button
              data-testid="widget-form-save-button"
              disabled={ !isWriteable }
              htmlType='submit'
              loading={ isLoading }
              type='primary'
            >
              {t('save')}
            </Button>
          </Tooltip>
        </Toolbar>
      </Flex>
    </FormKit>
  )
}

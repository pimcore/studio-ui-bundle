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
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { type CreatePerspectiveConfig, type PerspectiveConfigDetail } from '@sdk/api/perspectives'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePerspectiveEditorContext } from '../../context/hooks/use-perspective-editor-context'
import { usePerspectiveEditor } from '../../hooks/use-perspective-editor'
import { AllowedMenuEntriesPanel } from './components/allowed-menu-entries-panel/allowed-menu-entries-panel'
import { GeneralPanel } from './components/general-panel/general-panel'
import { SpecificPanel } from './components/specific-panel/specific-panel'
import { type ExtendedWidgetConfig } from './components/widget-configurator/context/widget-configurator-provider'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

export interface PerspectiveFormProps {
  perspective: PerspectiveConfigDetail
}

interface OptimizedPerspectiveConfigDetail extends Omit<PerspectiveConfigDetail, 'widgetsLeft' | 'widgetsRight' | 'widgetsBottom'> {
  widgetsLeft: ExtendedWidgetConfig
  widgetsRight: ExtendedWidgetConfig
  widgetsBottom: ExtendedWidgetConfig
}

export const PerspectiveForm = ({ perspective }: PerspectiveFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updatePerspective, removeWithConfirmation, isLoading } = usePerspectiveEditor()
  const { setPerspectives, closePerspective } = usePerspectiveEditorContext()
  const [form] = Form.useForm<OptimizedPerspectiveConfigDetail>()
  const initialValues = {
    ...perspective,
    widgetsLeft: {
      widgets: perspective.widgetsLeft,
      expanded: perspective.expandedLeft
    },
    widgetsRight: {
      widgets: perspective.widgetsRight,
      expanded: perspective.expandedRight
    },
    widgetsBottom: {
      widgets: perspective.widgetsBottom,
      expanded: null
    }
  }
  const isWriteable = perspective.isWriteable

  return (
    <FormKit
      formProps={ {
        form,
        initialValues,
        onFinish: async (values: OptimizedPerspectiveConfigDetail) => {
          const { widgetsLeft, widgetsRight, widgetsBottom, ...rest } = values

          const formattedValues: CreatePerspectiveConfig = {
            ...rest,
            widgetsLeft: Object.fromEntries(widgetsLeft.widgets.map(w => [w.id, w.widgetType])),
            expandedLeft: widgetsLeft.expanded,
            widgetsRight: Object.fromEntries(widgetsRight.widgets.map(w => [w.id, w.widgetType])),
            expandedRight: widgetsRight.expanded,
            widgetsBottom: Object.fromEntries(widgetsBottom.widgets.map(w => [w.id, w.widgetType]))
          }

          await updatePerspective(perspective.id, formattedValues)
        }
      } }
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
          <GeneralPanel />
          <SpecificPanel />
          <AllowedMenuEntriesPanel />
        </Content>

        <Toolbar justify="space-between">
          <div>
            <IconButton
              data-testid="perspective-form-refresh-button"
              disabled={ isLoading }
              icon={ { value: 'refresh' } }
              onClick={ () => {
                form.resetFields()
                form.setFieldsValue(initialValues)
              } }
              title={ t('refresh') }
            />

            <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
              <IconButton
                data-testid="perspective-form-delete-button"
                disabled={ isLoading || !isWriteable }
                icon={ { value: 'trash' } }
                onClick={ () => {
                  removeWithConfirmation(perspective.id, () => {
                    closePerspective(perspective.id)
                    setPerspectives((prev) => prev.filter((p) => p.id !== perspective.id))
                  })
                } }
                title={ t('delete') }
              />
            </Tooltip>
          </div>

          <Tooltip title={ isWriteable ? '' : t('config_not_writeable') }>
            <Button
              data-testid="perspective-form-save-button"
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

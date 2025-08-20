/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  type BundleCustomReportsConfigurationTreeNode,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { type ReportFormData, useReportFormState } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
  onDirtyStateChange?: (isDirty: boolean) => void
}

export interface ReportConfigurationRef {
  save: () => Promise<boolean>
  isDirty: boolean
  currentData: ReportFormData | null
}

export const ReportConfiguration = forwardRef<ReportConfigurationRef, IReportConfigurationProps>(({ report, onDirtyStateChange }, ref): React.JSX.Element => {
  const { isLoading, data } = useCustomReportsReportQuery({ name: report.id })

  const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = useReportFormState()

  const { t } = useTranslation()

  useEffect(() => {
    if (!isUndefined(data)) {
      initializeForm(data)
    }
  }, [data])

  useEffect(() => {
    onDirtyStateChange?.(isDirty)
  }, [isDirty, onDirtyStateChange])

  const handleSave = async (): Promise<boolean> => {
    if (isNull(currentData) || !isDirty) return false

    markFormSaved()

    return true
  }

  useImperativeHandle(ref, () => ({
    save: handleSave,
    isDirty,
    currentData
  }), [handleSave, isDirty, currentData])

  return (
    <Content
      loading={ isLoading }
      padded
      padding={ { top: 'none', right: 'extra-small', bottom: 'none', left: 'extra-small' } }
    >
      {!isNull(currentData) && (
      <FormKit>
        <FormKit.Panel title={ t('reports.editor.general-settings.title') }>
          <Form.Item label="Name">
            <Input
              disabled
              value={ currentData.name }
            />
          </Form.Item>
          <Form.Item label="Nice Name">
            <Input
              onChange={ (e) => { updateFormData({ niceName: e.target.value }) } }
              value={ currentData.niceName }
            />
          </Form.Item>
        </FormKit.Panel>
        <FormKit.Panel title={ t('reports.editor.source-definition.title') }>
          Content
        </FormKit.Panel>
        <FormKit.Panel title={ t('reports.editor.manage-column-configuration.title') }>
          Content
        </FormKit.Panel>
        <FormKit.Panel title={ t('reports.editor.chart-settings.title') }>
          Content
        </FormKit.Panel>
        <FormKit.Panel title={ t('reports.editor.permissions.title') }>
          Content
        </FormKit.Panel>
      </FormKit>
      )}
    </Content>
  )
})

ReportConfiguration.displayName = 'ReportConfiguration'

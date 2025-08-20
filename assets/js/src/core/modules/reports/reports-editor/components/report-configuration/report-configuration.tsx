/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigUpdateApiArg,
  useCustomReportsReportQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { useReportFormState } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { Portal } from '@Pimcore/components/portal/portal'
import { Button } from '@Pimcore/components/button/button'
import { useReportActions } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-actions'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
  isActive: boolean
  onDirtyStateChange?: (isDirty: boolean) => void
}

export const ReportConfiguration = ({ report, isActive }: IReportConfigurationProps): React.JSX.Element => {
  const { isLoading, data } = useCustomReportsReportQuery({ name: report.id })

  const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = useReportFormState()
  const { updateReport } = useReportActions()

  const [isUpdatingReport, setIsUpdatingReport] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (!isUndefined(data)) {
      initializeForm(data)
    }
  }, [data])

  const handleSave = (): void => {
    if (isNull(currentData)) return

    setIsUpdatingReport(true)

    void updateReport({
      name: report.id,
      bundleCustomReportUpdate: currentData as unknown as CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']
    }).then(() => {
      markFormSaved()
      setIsUpdatingReport(false)
    })
  }

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
          {isActive && (
          <Portal targetId="toolbar-portal-root">
            <Button
              disabled={ !isDirty }
              loading={ isUpdatingReport }
              onClick={ handleSave }
              type="primary"
            >
              {t('save')}
            </Button>
          </Portal>
          )}
      </FormKit>
      )}
    </Content>
  )
}

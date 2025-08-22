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
import { type ReportFormData, useReportFormState } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { Portal } from '@Pimcore/components/portal/portal'
import { Button } from '@Pimcore/components/button/button'
import { useReportActions } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-actions'
import { SAVE_BTN_PORTAL_ID } from '@Pimcore/modules/reports/reports-editor/reports-editor'
import { GeneralSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings'
import { SourceDefinition } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition'
import { ColumnConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration'
import { ChartSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings'
import { Permissions } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
  isActive: boolean
}

export const ReportConfiguration = ({ report, isActive }: IReportConfigurationProps): React.JSX.Element => {
  const { isLoading, data } = useCustomReportsReportQuery({ name: report.id })

  const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = useReportFormState()
  const { updateReport } = useReportActions()

  const [isUpdatingReport, setIsUpdatingReport] = useState(false)

  console.log('----->>>>> currentData', currentData)

  const { t } = useTranslation()

  useEffect(() => {
    if (!isUndefined(data)) {
      initializeForm(data)
    }
  }, [data])

  const onValuesChange = (changedValues: Partial<ReportFormData>, allValues: ReportFormData): void => {
    updateFormData({ ...currentData, ...allValues })
  }

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

  const renderSaveButton = (): React.JSX.Element => (
    <Portal targetId={ SAVE_BTN_PORTAL_ID }>
      <Button
        disabled={ !isDirty }
        loading={ isUpdatingReport }
        onClick={ handleSave }
        type="primary"
      >
        {t('save')}
      </Button>
    </Portal>
  )

  return (
    <Content
      loading={ isLoading }
      padded
      padding={ { top: 'none', right: 'extra-small', bottom: 'none', left: 'extra-small' } }
    >
      {!isNull(currentData) && (
      <FormKit formProps={ {
        initialValues: currentData,
        onValuesChange
      } }
      >
        <GeneralSettings />
        <SourceDefinition currentData={ currentData } />
        <ColumnConfiguration currentData={ currentData } />
        <ChartSettings currentData={ currentData } />
        <Permissions currentData={ currentData } />
        {isActive && renderSaveButton()}
      </FormKit>
      )}
    </Content>
  )
}

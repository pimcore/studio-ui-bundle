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
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { type ReportFormData, useReportFormState } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import { Portal } from '@Pimcore/components/portal/portal'
import { Button } from '@Pimcore/components/button/button'
import { useReportActions } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-actions'
import { REFETCH_BTN_PORTAL_ID, SAVE_BTN_PORTAL_ID } from '@Pimcore/modules/reports/reports-editor/reports-editor'
import { GeneralSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings'
import { SourceDefinition } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition'
import { ColumnConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration'
import { ChartSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings'
import { Permissions } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions'
import { normalizeChartData, normalizeDataSourceConfig } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/helpers'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
  isActive: boolean
}

export const ReportConfiguration = ({ report, isActive }: IReportConfigurationProps): React.JSX.Element => {
  const { isLoading, data, isFetching, refetch } = useCustomReportsReportQuery({ name: report.id })

  const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = useReportFormState()
  const { updateReport } = useReportActions()

  const [isUpdatingReport, setIsUpdatingReport] = useState(false)

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

    const bundleCustomReportUpdateData = {
      ...currentData,
      ...normalizeDataSourceConfig(currentData),
      ...normalizeChartData(currentData),
      ...(currentData.sharedGlobally && {
        sharedRoleNames: [],
        sharedUserNames: []
      })
    }

    void updateReport({
      name: report.id,
      bundleCustomReportUpdate: bundleCustomReportUpdateData as unknown as CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']
    }).then(() => {
      markFormSaved()
      setIsUpdatingReport(false)
    })
  }

  const renderRefetchButton = (): React.JSX.Element => (
    <Portal targetId={ REFETCH_BTN_PORTAL_ID }>
      <Refetch
        isFetching={ isFetching }
        refetch={ refetch }
      />
    </Portal>
  )

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
      loading={ isLoading || isFetching }
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
        <SourceDefinition
          currentData={ currentData }
          updateFormData={ updateFormData }
        />
        <ColumnConfiguration
          currentData={ currentData }
          updateFormData={ updateFormData }
        />
        <ChartSettings currentData={ currentData } />
        <Permissions
          currentData={ currentData }
          updateFormData={ updateFormData }
        />
        {isActive && renderRefetchButton()}
        {isActive && renderSaveButton()}
      </FormKit>
      )}
    </Content>
  )
}

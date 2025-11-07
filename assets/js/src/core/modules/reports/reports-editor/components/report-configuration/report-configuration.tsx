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
import { isNil, isNull, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type BundleCustomReportsDetails, type BundleCustomReportUpdate, useCustomReportsReportQuery
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
import {
  normalizeChartData,
  normalizeColumnConfigurations,
  normalizeDataSourceConfig
} from '@Pimcore/modules/reports/reports-editor/components/report-configuration/helpers'
import { Form } from '@Pimcore/components/form/form'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
  isActive: boolean
  modifiedReports: string[]
  setModifiedReports: (modifiedReports: string[]) => void
}

interface IDataSourceConfig {
  type?: string
  [key: string]: any
}

export const ReportConfiguration = ({ report, isActive, modifiedReports, setModifiedReports }: IReportConfigurationProps): React.JSX.Element => {
  const { isLoading, data, isFetching, refetch } = useCustomReportsReportQuery({ name: report.id })

  const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = useReportFormState()
  const { updateReport } = useReportActions()

  const [form] = Form.useForm()
  const watchedValues: Partial<BundleCustomReportsDetails> = Form.useWatch([], form)

  const [isUpdatingReport, setIsUpdatingReport] = useState(false)
  const dataSourceConfig: IDataSourceConfig | null | undefined = currentData?.dataSourceConfig

  const { t } = useTranslation()

  useEffect(() => {
    if (!isUndefined(data)) {
      initializeForm(data)
    }
  }, [data])

  useEffect(() => {
    if (isDirty) {
      setModifiedReports([...modifiedReports, report.id])
    } else {
      setModifiedReports(modifiedReports.filter((item) => item !== report.id))
    }
  }, [isDirty])

  useEffect(() => {
    if (!isNil(watchedValues)) {
      console.log('======= <<< START >>> ======')
      console.log('----->>>>> 000 currentData: ', currentData)
      console.log('----->>>>> 111 watchedValues: ', watchedValues)
      const activeFields = Object.keys(form.getFieldsValue() as object).filter(
        key => form.getFieldInstance(key) !== undefined
      )
      const currentFields = form.getFieldsValue()
      const filteredValues = Object.fromEntries(
        Object.entries(watchedValues).filter(([key]) => key in currentFields)
      )
      console.log('----->>>>> 222 currentFields: ', currentFields)
      console.log('----->>>>> 333 filteredValues: ', filteredValues)
      console.log('----->>>>> 444 activeFields: ', activeFields)
      console.log('======= <<< END >>> ======')
      updateFormData?.({ ...currentData, ...filteredValues })
    }
  }, [watchedValues])

  const onValuesChange = (changedValues: Partial<ReportFormData>, allValues: ReportFormData): void => {
    console.log('----->>>>> onValuesChange: ', allValues)
  }

  const handleSave = (): void => {
    if (isNull(currentData)) return

    setIsUpdatingReport(true)

    const bundleCustomReportUpdateData: BundleCustomReportUpdate = {
      ...currentData,
      ...normalizeDataSourceConfig(currentData),
      ...normalizeChartData(currentData),
      ...normalizeColumnConfigurations(currentData),
      ...(currentData.sharedGlobally && {
        sharedRoleNames: [],
        sharedUserNames: []
      })
    }

    void updateReport({
      name: report.id,
      bundleCustomReportUpdate: bundleCustomReportUpdateData
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
      loading={ isLoading }
      padded
      padding={ { top: 'none', right: 'extra-small', bottom: 'none', left: 'extra-small' } }
    >
      {!isNull(currentData) && (
      <FormKit
        formProps={ {
          form,
          initialValues: currentData,
          onValuesChange
        } }
        key={ dataSourceConfig?.type }
      >
        <GeneralSettings />
        <SourceDefinition
          currentData={ currentData }
          form={ form }
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

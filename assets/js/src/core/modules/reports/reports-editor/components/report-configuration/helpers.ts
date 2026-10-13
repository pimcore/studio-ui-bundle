/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { castArray, isNull } from 'lodash'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { type ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import {
  type BundleCustomReportsColumnConfigurationUpdateData,
  type BundleCustomReportUpdate,
  type CustomReportsConfigUpdateApiArg
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { denormalizeIcon } from '@Pimcore/utils/normalize-icon'

export const normalizeDataSourceConfig = (data: ReportFormData): {
  dataSourceConfig: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['dataSourceConfig']
} => {
  return {
    dataSourceConfig: castArray(
      data?.dataSourceConfig ?? []
    )
  }
}

interface INormalizeChartDataReturn {
  pieColumn: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['pieColumn']
  pieLabelColumn: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['pieLabelColumn']
  xAxis: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['xAxis']
  yAxis: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['yAxis']
}

export const normalizeChartData = (data: ReportFormData): INormalizeChartDataReturn => {
  if (data.chartType === '') {
    return { xAxis: '', yAxis: [], pieColumn: '', pieLabelColumn: '' }
  }

  return {
    pieColumn: data.pieColumn,
    pieLabelColumn: data.pieLabelColumn,
    xAxis: data.xAxis,
    yAxis: isNull(data.yAxis) ? [] : castArray(data.yAxis)
  }
}

interface INormalizeColumnConfigurationsDataReturn {
  columnConfigurations: BundleCustomReportsColumnConfigurationUpdateData[]
}

export const normalizeColumnConfigurations = (data: ReportFormData): INormalizeColumnConfigurationsDataReturn => {
  const cleanedColumns = data?.columnConfigurations?.map(
    ({ disableLabel, disableDropdownFilterable, disableOrderBy, disableFilterable, ...rest }) => rest
  )

  return {
    columnConfigurations: cleanedColumns
  }
}

interface INormalizeIconFieldsReturn {
  iconClass: BundleCustomReportUpdate['iconClass']
  groupIconClass: BundleCustomReportUpdate['groupIconClass']
}

export const normalizeIconFields = (data: ReportFormData): INormalizeIconFieldsReturn => {
  return {
    iconClass: denormalizeIcon(data?.iconClass) ?? '',
    groupIconClass: denormalizeIcon(data?.groupIconClass) ?? ''
  }
}

export type ReportFormField = keyof ReportFormData

export const GENERAL_SETTINGS_FIELDS: ReportFormField[] = [
  'niceName', 'iconClass', 'groupIconClass', 'group', 'reportClass', 'menuShortcut'
]

export const PERMISSION_FIELDS: ReportFormField[] = ['sharedGlobally', 'sharedUserNames', 'sharedRoleNames']

const hasChangedField = (prev: ReportFormData, next: ReportFormData, field: ReportFormField): boolean =>
  prev[field] !== next[field]

/**
 * Creates a React.memo comparator for section components. `currentData` is compared field by field (by reference),
 * either only the given fields (`mode: 'only'`) or all fields except the given ones (`mode: 'except'`). All other
 * props are compared by reference.
 */
export const createSectionPropsComparator = (
  fields: ReportFormField[],
  mode: 'only' | 'except'
): ((prev: IReportConfigurationSectionProps, next: IReportConfigurationSectionProps) => boolean) =>
  (prev, next) => {
    if (prev.form !== next.form || prev.updateFormData !== next.updateFormData) return false
    if (prev.currentData === next.currentData) return true

    const keys = mode === 'only'
      ? fields
      : [...new Set([...Object.keys(prev.currentData), ...Object.keys(next.currentData)])]
          .filter(key => !fields.includes(key as ReportFormField)) as ReportFormField[]

    return !keys.some(key => hasChangedField(prev.currentData, next.currentData, key))
  }

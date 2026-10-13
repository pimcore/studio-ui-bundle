/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo } from 'react'
import { isFunction, isNil } from 'lodash'
import { type IReportConfigurationSectionProps, type ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { getCustomReportDefinitionAdapter } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/get-custom-report-definition-adapter'
import { ColumnConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration'
import {
  createSectionPropsComparator,
  GENERAL_SETTINGS_FIELDS,
  PERMISSION_FIELDS
} from '@Pimcore/modules/reports/reports-editor/components/report-configuration/helpers'
import { ChartSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings'

const AdapterConfigurationComponent = ({ currentData, updateFormData, form }: IReportConfigurationSectionProps): React.JSX.Element => {
  // SourceDefinition shows a hint for unknown adapters
  const adapter = getCustomReportDefinitionAdapter((currentData.dataSourceConfig as ISourceDefinition)?.type, false)

  // Adapters registered by bundles built against an older SDK may not provide this method
  const customEditor = isFunction(adapter?.getCustomReportEditor)
    ? adapter.getCustomReportEditor({ currentData, updateFormData, form })
    : null

  if (!isNil(customEditor)) {
    return customEditor
  }

  return (
    <>
      <ColumnConfiguration
        currentData={ currentData }
        updateFormData={ updateFormData }
      />
      <ChartSettings currentData={ currentData } />
    </>
  )
}

// Memoized so the adapter's editor element is not recreated (and re-rendered) when only fields it cannot depend on
// change, i.e. the general settings and the permissions
export const AdapterConfiguration = memo(
  AdapterConfigurationComponent,
  createSectionPropsComparator([...GENERAL_SETTINGS_FIELDS, ...PERMISSION_FIELDS], 'except')
)

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isFunction, isNil } from 'lodash'
import { type IReportConfigurationSectionProps, type ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { getCustomReportDefinitionAdapter } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/get-custom-report-definition-adapter'
import { ColumnConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration'
import { ChartSettings } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings'

export const AdapterConfiguration = ({ currentData, updateFormData, form }: IReportConfigurationSectionProps): React.JSX.Element => {
  // SourceDefinition already reports unknown adapters
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

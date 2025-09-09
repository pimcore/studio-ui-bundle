/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'

export interface IReportConfigurationSectionProps {
  currentData: ReportFormData
  updateFormData?: (data: ReportFormData) => void
}

export interface ISQLSourceDefinition {
  from: string
  groupby: string
  orderby?: string
  orderbydir?: string | null
  sql: string
  type: string
  where: string
}

export type ISourceDefinition = null | ISQLSourceDefinition

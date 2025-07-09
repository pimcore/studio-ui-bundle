/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { PieChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart'

export const DEFAULT_CHART_TYPE = 'pie'
export const CHART_COMPONENTS = {
  pie: PieChart
} as const
export const CHART_FIELD_TYPE_KEY = 'type'
export const CHART_FIELD_VALUE_KEY = 'value'

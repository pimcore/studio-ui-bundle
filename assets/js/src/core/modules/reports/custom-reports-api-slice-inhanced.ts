/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api as baseApi } from './custom-reports-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  endpoints: {
    customReportsListDrillDownOptions: {
      invalidatesTags: []
    }
  }
})

export type * from './custom-reports-api-slice.gen'

export const {
  useCustomReportsListDrillDownOptionsMutation,
  useCustomReportsChartQuery,
  useCustomReportsConfigGetTreeQuery,
  useCustomReportExportCsvMutation,
  useCustomReportsReportQuery,
  useCustomReportsGetTreeQuery
} = api

export { api }

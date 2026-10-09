/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api as baseApi } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  endpoints: {
    customReportExportCsv: {
      invalidatesTags: () => []
    },
    customReportsConfigExport: {
      query: (args) => ({
        url: `/pimcore-studio/api/bundle/custom-reports/config/${encodeURIComponent(args.name)}/export`,
        responseHandler: async (response): Promise<Blob> => {
          return await response.blob()
        }
      }),
      providesTags: () => []
    },
    customReportsConfigImport: {
      query: (args) => {
        const formData = new FormData()
        formData.append('file', args.body.file)

        return {
          url: '/pimcore-studio/api/bundle/custom-reports/config/import',
          method: 'POST',
          body: formData
        }
      }
    }
  }
})

export type * from './custom-reports-api-slice.gen'

export const {
  useCustomReportsListDrillDownOptionsQuery,
  useCustomReportsChartQuery,
  useCustomReportsConfigAddMutation,
  useCustomReportsConfigCloneMutation,
  useCustomReportsColumnConfigListQuery,
  useCustomReportsConfigUpdateMutation,
  useCustomReportsConfigDeleteMutation,
  useCustomReportsConfigExportQuery,
  useCustomReportsConfigImportMutation,
  useCustomReportsReportQuery,
  useCustomReportsConfigGetTreeQuery,
  useCustomReportExportCsvMutation,
  useCustomReportsGetTreeQuery
} = api

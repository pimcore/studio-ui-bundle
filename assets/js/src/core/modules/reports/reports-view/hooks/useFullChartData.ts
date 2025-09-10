/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type CustomReportsChartApiResponse,
  useCustomReportsChartQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { PAGE_INITIAL } from '@Pimcore/modules/reports/reports-view/context/report-data-context'

interface IUseFullChartDataProps {
  name: string
}

export type IChartDetailData = CustomReportsChartApiResponse | undefined

export interface IUseFullChartDataReturn {
  data: IChartDetailData
  isLoading: boolean
}

export const useFullChartData = ({ name }: IUseFullChartDataProps): IUseFullChartDataReturn => {
  const {
    isLoading,
    data
  } = useCustomReportsChartQuery({ body: { name, page: PAGE_INITIAL, pageSize: 9999999999 } }, { skip: isEmptyValue(name) })

  return {
    isLoading,
    data
  }
}

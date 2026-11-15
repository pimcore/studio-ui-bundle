/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { isNil } from 'lodash'
import { Model } from 'flexlayout-react'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { WidgetContext } from '@Pimcore/modules/widget-manager/widget/widget-container'
import {
  rebindWidget,
  selectInnerModel,
  type widgetManagerSliceName,
  type WidgetManagerState
} from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useCustomReportsGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { buildReportWidgetConfig } from '@Pimcore/modules/reports/utils/report-widget-config'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

interface UseReportTabReturn {
  // Returns false when the view is not a main tab, so the caller switches the report in place.
  openReportInTab: (reportName: string) => boolean
}

export const useReportTab = (): UseReportTabReturn => {
  const { nodeId } = useContext(WidgetContext)
  const dispatch = useAppDispatch()
  const { data } = useCustomReportsGetTreeQuery(undefined, { skip: !isAllowed(UserPermission.Reports) })

  const openReportInTab = (reportName: string): boolean => {
    const innerModel = selectInnerModel(store.getState() as { [widgetManagerSliceName]: WidgetManagerState })

    if (isNil(nodeId) || isNil(Model.fromJson(innerModel).getNodeById(nodeId))) {
      return false
    }

    const report = data?.items?.find((item) => item.name === reportName) ?? { name: reportName }
    dispatch(rebindWidget({ originalId: nodeId, config: buildReportWidgetConfig(report) }))

    return true
  }

  return { openReportInTab }
}

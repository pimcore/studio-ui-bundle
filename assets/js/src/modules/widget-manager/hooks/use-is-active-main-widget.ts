/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { useAppSelector } from '@Pimcore/app/store'
import { selectMainWidgetContext } from '../widget-manager-slice'
import { useContext } from 'react'
import { WidgetContext } from '@Pimcore/modules/widget-manager/widget/widget-container'

export const useIsAcitveMainWidget = (): boolean => {
  const activeMainWidget = useAppSelector(selectMainWidgetContext)
  const currentWidget = useContext(WidgetContext)

  return activeMainWidget !== null && activeMainWidget.nodeId === currentWidget.nodeId
}

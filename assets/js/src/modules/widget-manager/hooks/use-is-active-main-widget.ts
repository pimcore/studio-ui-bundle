import { useAppSelector } from '@Pimcore/app/store'
import { selectMainWidgetContext } from '../widget-manager-slice'
import { useContext } from 'react'
import { WidgetContext } from '@Pimcore/modules/widget/widget-container'

export const useIsAcitveMainWidget = (): boolean => {
  const activeMainWidget = useAppSelector(selectMainWidgetContext)
  const currentWidget = useContext(WidgetContext)

  return activeMainWidget !== null && activeMainWidget.nodeId === currentWidget.nodeId
}

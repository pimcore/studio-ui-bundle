import React, { useEffect } from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { Actions, type ITabRenderValues, Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { selectOuterModel, updateOuterModel } from './widget-manager-slice'
import { getTabTokens } from './widget-manager-view.styles'
import { theme } from 'antd'
import { TabTitleContainer } from './title/tab-title-container'

const { useToken } = theme

export const WidgetManagerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectOuterModel)
  const dispatch = useAppDispatch()
  const model = Model.fromJson(modelJson)
  const bottomTabset = model.getNodeById('bottom_tabset') as TabSetNode
  const { token } = useToken()

  useEffect(() => {
    const tabToken = getTabTokens(token)

    model.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: tabToken.cardHeight,
      tabSetTabHeaderHeight: tabToken.cardHeight,
      borderBarSize: 50
    }))
  }, [])

  if (bottomTabset.getChildren().length === 0) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: -8 }))
  } else if (bottomTabset.getHeight() === -8) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: 40 }))
  }

  function onModelChange (model: Model): void {
    dispatch(updateOuterModel(model.toJson()))
  }

  function onRenderTab (node: TabNode, renderValues: ITabRenderValues): void {
    renderValues.content = <TabTitleContainer node={node} />
    renderValues.leading = <></>
  }

  return (
    <WidgetManagerView model={model} factory={widgetManagerFactory} onModelChange={onModelChange} onRenderTab={onRenderTab} />
  )
}

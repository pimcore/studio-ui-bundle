/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { store } from '@Pimcore/app/store'
import { selectActivePerspective } from '@Pimcore/modules/perspectives/active-perspective-slice'
import { type WidgetConfig, type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { type IJsonTabNode, type IJsonModel } from 'flexlayout-react'
import { isNil } from 'lodash'

export const getInitialModelJson = (): IJsonModel => {
  const activePerspective = selectActivePerspective(store.getState())

  return {
    global: {
      tabEnableRename: false,
      tabSetEnableMaximize: false,
      rootOrientationVertical: true
    },

    layout: {
      id: 'main',
      type: 'row',
      children: [
        {
          type: 'tabset',
          id: 'main_tabset',
          enableDeleteWhenEmpty: false,
          weight: 50,
          selected: 0,
          children: [
            {
              type: 'tab',
              component: 'inner-widget-manager',
              contentClassName: 'widget-manager-inner-container',
              enableClose: false
            }
          ],
          enableDrag: false,
          enableDrop: false,
          enableTabStrip: false
        },

        {
          type: 'tabset',
          id: 'bottom_tabset',
          enableDeleteWhenEmpty: false,
          weight: 50,
          height: 0,
          selected: 0,
          children: getWidgetsBottom(activePerspective)
        }
      ]
    },

    borders: [
      {
        type: 'border',
        location: 'left',
        size: 315,
        selected: getWidgetIndex(activePerspective?.widgetsLeft, activePerspective?.expandedLeft as string | undefined | null),
        children: getWidgetsLeft(activePerspective)
      },

      {
        type: 'border',
        location: 'right',
        size: 315,
        selected: getWidgetIndex(activePerspective?.widgetsRight, activePerspective?.expandedRight as string | undefined | null),
        children: getWidgetsRight(activePerspective)
      }
    ]
  }
}

const getWidgetsLeft = (activePerspective: PerspectiveConfigDetail | null): IJsonTabNode[] => {
  if (activePerspective === null) {
    return []
  }
  return widgetsToModelJson(activePerspective.widgetsLeft)
}

const getWidgetsRight = (activePerspective: PerspectiveConfigDetail | null): IJsonTabNode[] => {
  if (activePerspective === null) {
    return []
  }
  return widgetsToModelJson(activePerspective.widgetsRight)
}

const getWidgetsBottom = (activePerspective: PerspectiveConfigDetail | null): IJsonTabNode[] => {
  if (activePerspective === null) {
    return []
  }
  return widgetsToModelJson(activePerspective.widgetsBottom)
}

const getWidgetIndex = (widgets?: WidgetConfig[], widgetId?: string | null): number | undefined => {
  if (isNil(widgets) || isNil(widgetId)) {
    return undefined
  }
  return widgets.findIndex(widget => widget.id === widgetId)
}

const widgetsToModelJson = (widgets?: WidgetConfig[]): IJsonTabNode[] => {
  const result: IJsonTabNode[] = []

  widgets?.forEach((widget) => {
    // skip document trees until we have a documents implementation
    if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'document') {
      return
    }
    result.push({
      type: 'tab',
      name: widget.name,
      component: widget.widgetType,
      enableClose: false,
      config: widget
    })
  })

  return result
}

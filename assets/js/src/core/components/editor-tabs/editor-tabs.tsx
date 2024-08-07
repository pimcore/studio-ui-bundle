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

import React, { useContext, useState } from 'react'
import { useStyle } from '@Pimcore/components/editor-tabs/editor-tabs.styles'
import { Button, Tabs, Tooltip } from 'antd'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDetachTab } from '@Pimcore/components/editor-tabs/hooks/use-detach-tab'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'

export interface IAdvancedEditorTab extends IEditorTab {
  originalLabel?: string
}

export interface IEditorTabsProps {
  items: IAdvancedEditorTab[]
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export const EditorTabs = ({ defaultActiveKey, showLabelIfActive, items }: IEditorTabsProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { detachWidget } = useDetachTab()
  const { id } = useContext(AssetContext)
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)

  const openDetachedWidget = (item: IEditorTab): void => {
    detachWidget({
      item
    })
  }

  items = items?.map((item) => {
    const handleMouseEnter = (): void => {
      setHoveredTooltip(item.key)
    }

    const handleMouseLeave = (): void => {
      setHoveredTooltip(null)
    }

    const toolTipIsVisible = hoveredTooltip === item.key

    const tmpItem = {
      ...item,
      originalLabel: item.label as string,
      icon: (
        <Tooltip
          arrow={ false }
          open={ toolTipIsVisible }
          placement="top"
          title={ item.label }
        >
          <div
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
          >{item.icon}</div>
        </Tooltip>)
    }

    if (tmpItem.isDetachable === true) {
      tmpItem.label = (
        <>
          <span>{tmpItem.label}</span>
          <Button
            className={ 'detachable-button' }
            icon={
              <Icon
                name={ 'share-03' }
                options={ { width: 14, height: 14 } }
              />
            }
            onClick={ () => {
              openDetachedWidget(tmpItem)
            } }
            type={ 'link' }
          />
        </>
      )
    }

    return tmpItem
  })

  return (
    <>
      <Tabs
        className={ `${styles.editorTabs} ${(showLabelIfActive === true) ? styles.onlyActiveLabel : ''}` }
        defaultActiveKey={ defaultActiveKey }
        items={ items }
        tabBarExtraContent={ {
          left: <ElementToolbar id={ id! } />
        } }
      />
    </>
  )
}

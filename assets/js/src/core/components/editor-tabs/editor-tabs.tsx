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

import React, { useContext } from 'react'
import { useStyle } from '@Pimcore/components/editor-tabs/editor-tabs.styles'
import { Button, Tabs } from 'antd'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDetachTab } from '@Pimcore/components/editor-tabs/hooks/use-detach-tab'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { IconWrapper } from '@Pimcore/components/editor-tabs/editor-tabs.icon-wrapper'

export interface IAdvancedEditorTab extends IEditorTab {
  originalLabel?: string
}

export interface IEditorTabsProps {
  items: IAdvancedEditorTab[]
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export interface IconWrapperProps {
  tabKey: string
  title: string
  children: React.ReactNode
}

export const EditorTabs = ({ defaultActiveKey, showLabelIfActive, items }: IEditorTabsProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { detachWidget } = useDetachTab()
  const { id } = useContext(AssetContext)

  const openDetachedWidget = (item: IEditorTab): void => {
    detachWidget({
      item
    })
  }

  items = items?.map((item) => {
    const tmpItem = {
      ...item,
      originalLabel: item.label as string,
      icon: (<IconWrapper
        tabKey={ item.key }
        title={ item.label as string }
             >
        {item.icon}
      </IconWrapper>)
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

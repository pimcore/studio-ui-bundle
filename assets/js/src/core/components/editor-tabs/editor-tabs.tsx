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

import React, { type FocusEvent, useContext, useEffect, useState } from 'react'
import { useStyle } from '@Pimcore/components/editor-tabs/editor-tabs.styles'
import { Tabs } from 'antd'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { useDetachTab } from '@Pimcore/components/editor-tabs/hooks/use-detach-tab'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { IconWrapper } from '@Pimcore/components/editor-tabs/editor-tabs.icon-wrapper'
import { IconButton } from '../icon-button/icon-button'

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
  const [activeTabKey, setActiveTabKey] = useState<string | null>(null)
  const [tabKeyInFocus, setTabKeyInFocus] = useState<string | undefined>(undefined)
  const [tabKeyOutOfFocus, setTabKeyOutOfFocus] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (activeTabKey === null && items.length > 0) {
      setActiveTabKey(items[0].key)
    }
  }, [items])

  const onChange = (key: string): void => {
    setActiveTabKey(key)
  }

  const tabKeys: string[] = items?.map(item => item.key)

  const findTabKey = (event: FocusEvent<HTMLDivElement>): string | undefined => {
    const target = event.target as HTMLDivElement
    const id = target.id
    return tabKeys.find(substring => id.includes(substring))
  }

  const onFocus = (event: FocusEvent<HTMLDivElement>): void => {
    setTabKeyInFocus(findTabKey(event))
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>): void => {
    setTabKeyOutOfFocus(findTabKey(event))
  }

  const openDetachedWidget = (item: IEditorTab): void => {
    detachWidget({
      item
    })
  }

  items = items?.map((item) => {
    const tmpItem = {
      ...item,
      originalLabel: item.label as string,
      icon: (
        <IconWrapper
          activeTabKey={ activeTabKey }
          tabKey={ item.key }
          tabKeyInFocus={ tabKeyInFocus }
          tabKeyOutOfFocus={ tabKeyOutOfFocus }
          title={ item.label as string }
        >
          {item.icon}
        </IconWrapper>
      )
    }

    if (tmpItem.isDetachable === true) {
      tmpItem.label = (
        <>
          <span>{tmpItem.label}</span>
          <IconButton
            className={ 'detachable-button' }
            icon={ 'share-03' }
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
        onBlur={ onBlur }
        onFocus={ onFocus }
        onTabClick={ onChange }
        tabBarExtraContent={ {
          left: <ElementToolbar id={ id! } />
        } }
      />
    </>
  )
}

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

import React, { type FocusEvent, useEffect, useState, useRef } from 'react'
import { useStyle } from '@Pimcore/modules/element/editor/tabs/editor-tabs.styles'
import { Tabs } from 'antd'
import cn from 'classnames'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { type IDetachTab, useDetachTab } from '@Pimcore/modules/element/editor/tabs/hooks/use-detach-tab'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { IconWrapper } from '@Pimcore/modules/element/editor/tabs/editor-tabs.icon-wrapper'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Box } from '@Pimcore/components/box/box'

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
  const { id, elementType } = useElementContext()
  const { activeTab, setActiveTab } = useElementDraft(id, elementType)
  const [tabKeyInFocus, setTabKeyInFocus] = useState<string | undefined>(undefined)
  const [tabKeyOutOfFocus, setTabKeyOutOfFocus] = useState<string | undefined>(undefined)
  const elementDraft = useElementDraft(id, elementType)
  const element = elementDraft.element!

  const elementRef = useRef<HTMLDivElement>(null)

  const editorTabsWidth = useElementResize(elementRef)

  useEffect(() => {
    if (activeTab === null && items?.length > 0) {
      setActiveTab(items[0].key)
    }
  }, [items])

  const onChange = (key: string): void => {
    setActiveTab(key)
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

  const openDetachedWidget = (item: IDetachTab): void => {
    detachWidget(item)

    if (items?.length > 0) {
      setActiveTab(items[0].key)
    }
  }

  items = items.filter((item) => {
    if (item.hidden !== undefined && item.hidden(element)) {
      return false
    }

    if (item.workspacePermission !== undefined && element?.permissions !== undefined) {
      if (!checkElementPermission(element.permissions, item.workspacePermission as keyof typeof element.permissions)) {
        return false
      }
    }

    if (item.userPermission !== undefined && !isAllowed(item.userPermission)) {
      return false
    }

    return true
  })

  items = items?.map((item) => {
    const tmpItem = {
      ...item,
      originalLabel: item.label as string,
      icon: (
        <IconWrapper
          activeTabKey={ activeTab }
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
            icon={ { value: 'share' } }
            onClick={ (e) => {
              e.stopPropagation()
              openDetachedWidget({
                tabKey: item.key
              })
            } }
            type={ 'link' }
          />
        </>
      )
    }

    return tmpItem
  })

  return (
    <div
      className={ styles.editorTabsContainer }
      ref={ elementRef }
    >
      <Tabs
        activeKey={ activeTab ?? undefined }
        className={ cn(styles.editorTabs, { [styles.onlyActiveLabel]: showLabelIfActive }) }
        defaultActiveKey={ defaultActiveKey }
        items={ items }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onTabClick={ onChange }
        tabBarExtraContent={ {
          left: (
            <Box padding={ { left: 'extra-small', top: 'extra-small', bottom: 'extra-small' } }>
              <ElementToolbar
                editorTabsWidth={ editorTabsWidth }
                elementType={ elementType }
                id={ id }
              />
            </Box>

          )
        } }
      />
    </div>
  )
}

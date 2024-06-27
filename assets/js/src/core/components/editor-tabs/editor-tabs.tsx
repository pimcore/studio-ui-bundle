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

import React from 'react'
import { useStyle } from '@Pimcore/components/editor-tabs/editor-tabs.styles'
import { Button, Result, Tabs } from 'antd'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDetachTab } from '@Pimcore/components/editor-tabs/hooks/use-detach-tab'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'

export interface IAdvancedEditorTab extends IEditorTab {
  originalLabel?: string
}

interface IEditorTabsProps {
  items: IAdvancedEditorTab[]
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export const EditorTabs = ({ defaultActiveKey, showLabelIfActive, items }: IEditorTabsProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { detachWidget } = useDetachTab()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const openDetachedWidget = (item: IEditorTab): void => {
    detachWidget({
      item
    })
  }

  items = items?.map((item) => {
    const tmpItem = {
      ...item,
      originalLabel: item.label as string
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

  console.log(styles)

  return (
    <>
      <Tabs
        className={ `${styles.editorTabs} ${(showLabelIfActive === true) ? styles.onlyActiveLabel : ''}` }
        defaultActiveKey={ defaultActiveKey }
        items={ items }
        tabBarExtraContent={ {
          left: <ElementToolbar context={ context } />
        } }
      />
    </>
  )
}

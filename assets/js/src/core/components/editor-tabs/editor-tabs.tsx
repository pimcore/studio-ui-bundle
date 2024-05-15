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
import { Button, Tabs } from 'antd'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'

interface EditorTabsProps {
  items: IEditorTab[]
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export const EditorTabs = ({ defaultActiveKey, showLabelIfActive, items }: EditorTabsProps): React.JSX.Element => {
  const { styles } = useStyle()

  items = items?.map((item) => {
    return {
      ...item,
      label: (item.isDetachable === true)
        ? (
          <>
            <span>{ item.label }</span>
            <Button
              className={ 'detachable-button' }
              icon={
                <Icon
                  name={ 'share-03' }
                  options={ { width: 14, height: 14 } }
                />
              }
              onClick={ () => { console.log(`detached ${item.key}!`) } }
              type={ 'link' }
            />
          </>
          )
        : item.label
    }
  })

  return (
    <Tabs
      className={ `${styles.editorTabs} ${(showLabelIfActive === true) ? styles.onlyActiveLabel : ''}` }
      defaultActiveKey={ defaultActiveKey }
      items={ items }
    />
  )
}

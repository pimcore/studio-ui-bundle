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
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { useTranslation } from 'react-i18next'
import { container } from '@Pimcore/app/depency-injection'
import { type FolderTabManager } from './folder-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'

const TabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

  const tabs = folderEditorTabManager.getTabs()
  const preparedTabs = tabs.map((tab, index) => {
    return {
      ...tabs[index],
      label: t(tab.label)
    }
  })

  return (
    <EditorTabsView
      defaultActiveKey='preview'
      items={ preparedTabs }
      showLabelIfActive
    />
  )
}

export { TabsContainer }

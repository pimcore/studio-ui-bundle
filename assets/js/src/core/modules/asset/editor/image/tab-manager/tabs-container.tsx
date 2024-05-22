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
import { type ImageTabManager } from '@Pimcore/modules/asset/editor/image/tab-manager/image-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'

export const TabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const imageEditorTabManager = container.get<ImageTabManager>(serviceIds['Asset/Editor/ImageTabManager'])

  const tabs = imageEditorTabManager.getTabs()
  const preparedTabs = tabs.map((tab, index) => {
    return {
      ...tabs[index],
      label: typeof tab.label === 'string' ? t(tab.label) : tab.label
    }
  })

  return (
    <EditorTabsView
      defaultActiveKey={ '1' }
      items={ preparedTabs }
      showLabelIfActive
    />
  )
}

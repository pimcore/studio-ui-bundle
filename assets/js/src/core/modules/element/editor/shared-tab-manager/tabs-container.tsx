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
import { type IElementEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IElementEditorTabManager'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type ElementEditorType } from '@Pimcore/modules/element/editor/services/type-registry'

export const TabsContainer = ({ elementEditorType }: { elementEditorType: ElementEditorType }): React.JSX.Element => {
  const { t } = useTranslation()
  const tabManager = useInjection<IElementEditorTabManager>(elementEditorType.tabManagerServiceId)

  const tabs = tabManager.getTabs()
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

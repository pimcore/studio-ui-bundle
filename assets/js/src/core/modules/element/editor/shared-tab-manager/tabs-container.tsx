/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { EditorTabs as EditorTabsView } from '@Pimcore/modules/element/editor/tabs/editor-tabs'
import { useTranslation } from 'react-i18next'
import { type IElementEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IElementEditorTabManager'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type ElementEditorType } from '@Pimcore/modules/element/editor/services/type-registry'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { TabManagerProvider } from '@Pimcore/modules/element/editor/shared-tab-manager/tab-manager-context'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { useRename } from '@Pimcore/modules/element/actions/rename/use-rename'
import { usePublish } from '@Pimcore/modules/element/actions/publish/use-publish'
import { useUnpublish } from '@Pimcore/modules/element/actions/unpublish/use-unpublish'
import { getElementKey } from '@Pimcore/modules/element/element-helper'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { useLocateInTree } from '@Pimcore/modules/element/actions/locate-in-tree/use-locate-in-tree'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type Document } from '@Pimcore/modules/document/document-api-slice.gen'
import { has, isNull } from 'lodash'
import { isWorkflowAvailable } from '@Pimcore/modules/element/utils/workflow-availability'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import {
  useTreePermission
} from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'

export const TabsContainer = ({ elementEditorType }: { elementEditorType: ElementEditorType }): React.JSX.Element => {
  const { t } = useTranslation()
  const tabManager = useInjection<IElementEditorTabManager>(elementEditorType.tabManagerServiceId)
  const { id, elementType } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const tabs = tabManager.getTabs()
  const { rename } = useRename(elementType)
  const { publishNode } = usePublish(elementType)
  const { unpublishTreeNode } = useUnpublish(elementType)
  const { refreshElement } = useElementRefresh(elementType)
  const { locateInTree } = useLocateInTree(elementType)
  const { isTreeActionAllowed } = useTreePermission()

  const preparedTabs = tabs.map((tab, index) => {
    const baseTab = {
      ...tabs[index],
      label: typeof tab.label === 'string' ? t(tab.label) : tab.label
    }

    if (tab.key === 'workflow') {
      return {
        ...baseTab,
        hidden: () => !isWorkflowAvailable(element, elementType)
      }
    }
    return baseTab
  })

  useHandleKeyBindings(() => { if (element != null && checkElementPermission(element.permissions, 'rename') && !(element as unknown as Element).isLocked) rename(element.id, getElementKey(element as unknown as Element, elementType)) }, 'rename')
  useHandleKeyBindings(() => { if (element != null && isTreeActionAllowed(TreePermission.Publish) && !(element as unknown as Element).isLocked && (has(element, 'published') && element.published === false)) publishNode(element as unknown as Element) }, 'publish')
  useHandleKeyBindings(() => { if (element != null && !isNull(elementType) && elementType !== 'asset' && checkElementPermission(element.permissions, 'unpublish') && !(element as unknown as Element).isLocked) unpublishTreeNode(element as unknown as DataObject | Document) }, 'unpublish')
  useHandleKeyBindings(() => { if (element != null) refreshElement(element.id) }, 'refresh')
  useHandleKeyBindings(() => { if (element != null) locateInTree(element.id) }, 'openInTree')

  return (
    <TabManagerProvider tabManager={ tabManager }>
      <EditorTabsView
        defaultActiveKey={ '1' }
        items={ preparedTabs }
        showLabelIfActive
      />
    </TabManagerProvider>
  )
}

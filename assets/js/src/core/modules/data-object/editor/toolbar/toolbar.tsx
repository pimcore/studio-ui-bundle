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
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useDataObjectDraft } from '../../hooks/use-data-object-draft'
import { DataObjectContext } from '../../data-object-provider'

import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { Flex } from '@Pimcore/components/flex/flex'
import { TAB_EDIT } from '../types/object/tab-manager/tabs/edit/edit-container'
import { LanguageSelection } from './language-selection/language-selection'
import { WorkflowLogModal } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-menu'
import { WorkFlowProvider } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'

import {
  EditorToolbarSaveButtons
} from '@Pimcore/modules/data-object/editor/toolbar/save-buttons/save-buttons'

export const Toolbar = (): React.JSX.Element => {
  const { id } = useContext(DataObjectContext)
  const { activeTab } = useDataObjectDraft(id)
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const ContextMenu = componentRegistry.get('editorToolbarContextMenuDataObject')

  return (
    <ToolbarView>
      <WorkFlowProvider>
        <Flex>
          <ContextMenu />

          {activeTab === TAB_EDIT.key && (
            <LanguageSelection />
          )}
        </Flex>

        <Flex
          align="center"
          gap={ 'extra-small' }
          style={ { height: '32px' } }
          vertical={ false }
        >
          <EditorToolbarWorkflowMenu />
          <EditorToolbarSaveButtons />
        </Flex>
        <WorkflowLogModal />
      </WorkFlowProvider>
    </ToolbarView>
  )
}

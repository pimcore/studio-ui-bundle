/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useMemo } from 'react'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementRefresh } from '@sdk/modules/element'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { WorkflowLayoutOverrideContext } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/workflow-layout-override-context'
import { type WorkflowActionSubject } from '../types/workflow-types'
import { WorkflowActionSubjectContext } from './workflow-provider'

interface EditorWorkflowSubjectBridgeProps {
  children: React.ReactNode
}

/**
 * Supplies the {@link WorkflowActionSubject} from the element-editor context — the default when
 * `WorkFlowProvider` is used inside an editor and no explicit `subject` is passed. Isolates the
 * editor-only dependencies (element context, element refresh, data-object layout reset) so the shared
 * submit/modal flow stays element-editor-agnostic. On success it refreshes the element and, for a
 * data-object, switches to the action's configured object layout or otherwise resets the current layout.
 */
export const EditorWorkflowSubjectBridge = ({ children }: EditorWorkflowSubjectBridgeProps): React.JSX.Element => {
  const element = useOptionalElementContext()
  const { refreshElement } = useElementRefresh(element?.elementType ?? 'asset')
  const { setCurrentLayout } = useLayoutSelection()
  const setWorkflowLayoutOverride = useContext(WorkflowLayoutOverrideContext)

  const subject = useMemo<WorkflowActionSubject | null>(() => {
    if (element === null) {
      return null
    }

    return {
      elementId: element.id,
      elementType: element.elementType,
      onApplied: (action) => {
        if (element.elementType === 'data-object') {
          // switch to the custom layout configured on the transition, otherwise reset to the default one;
          // the override keeps it once the refresh changes the derived default layout (new place)
          setWorkflowLayoutOverride(action.objectLayout ?? null)
          setCurrentLayout(action.objectLayout ?? null)
        }
        refreshElement(element.id)
      }
    }
  }, [element, refreshElement, setCurrentLayout, setWorkflowLayoutOverride])

  return (
    <WorkflowActionSubjectContext.Provider value={ subject }>
      {children}
    </WorkflowActionSubjectContext.Provider>
  )
}

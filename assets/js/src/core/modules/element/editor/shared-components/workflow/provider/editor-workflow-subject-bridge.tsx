/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementRefresh } from '@sdk/modules/element'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
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
 * data-object, resets the current layout — the exact behaviour the toolbars had before the refactor.
 */
export const EditorWorkflowSubjectBridge = ({ children }: EditorWorkflowSubjectBridgeProps): React.JSX.Element => {
  const element = useOptionalElementContext()
  const { refreshElement } = useElementRefresh(element?.elementType ?? 'asset')
  const { setCurrentLayout } = useLayoutSelection()

  const subject = useMemo<WorkflowActionSubject | null>(() => {
    if (element === null) {
      return null
    }

    return {
      elementId: element.id,
      elementType: element.elementType,
      onApplied: () => {
        if (element.elementType === 'data-object') {
          setCurrentLayout(null)
        }
        refreshElement(element.id)
      }
    }
  }, [element, refreshElement, setCurrentLayout])

  return (
    <WorkflowActionSubjectContext.Provider value={ subject }>
      {children}
    </WorkflowActionSubjectContext.Provider>
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef } from 'react'
import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementRefresh } from '@sdk/modules/element'
import { useLayoutSelection } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection'
import { type WorkflowActionSubject } from '../types/workflow-types'
import { useUnsavedChangesGuard } from '../hooks/use-unsaved-changes-guard'
import {
  type IUnsavedChangesSaverContext,
  type UnsavedChangesSaver,
  UnsavedChangesSaverContext
} from './unsaved-changes-saver-context'
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
 * Before submitting it applies the transition's unsavedChangesBehaviour (see useUnsavedChangesGuard),
 * saving through the saver the editor's save flow registers in UnsavedChangesSaverContext.
 */
export const EditorWorkflowSubjectBridge = ({ children }: EditorWorkflowSubjectBridgeProps): React.JSX.Element => {
  const element = useOptionalElementContext()
  const { refreshElement } = useElementRefresh(element?.elementType ?? 'asset')
  const { setCurrentLayout } = useLayoutSelection()
  const saverRef = useRef<UnsavedChangesSaver | undefined>(undefined)
  const saverContext = useMemo<IUnsavedChangesSaverContext>(() => ({
    setSaver: (saver) => { saverRef.current = saver }
  }), [])
  const { guard } = useUnsavedChangesGuard(element?.id ?? 0, element?.elementType ?? 'asset', () => saverRef.current)

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
      },
      beforeSubmit: guard
    }
  }, [element, refreshElement, setCurrentLayout, guard])

  return (
    <WorkflowActionSubjectContext.Provider value={ subject }>
      <UnsavedChangesSaverContext.Provider value={ saverContext }>
        {children}
      </UnsavedChangesSaverContext.Provider>
    </WorkflowActionSubjectContext.Provider>
  )
}

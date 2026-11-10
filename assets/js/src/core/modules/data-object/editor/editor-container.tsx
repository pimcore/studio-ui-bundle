/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import {
  EditorContainerInner,
  type EditorContainerInnerProps
} from '@Pimcore/modules/data-object/editor/editor-container/editor-container-inner'
import { useCustomLayouts } from '@Pimcore/modules/data-object/hooks/use-custom-layouts'
import {
  LayoutSelectionProvider
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider'
import {
  WorkflowLayoutOverrideContext
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/workflow-layout-override-context'

export interface EditorContainerProps extends EditorContainerInnerProps {}

const EditorContainer = ({ id }: EditorContainerInnerProps): React.JSX.Element => {
  const { getDefaultLayoutId, isLoading } = useCustomLayouts(id)

  // layout pinned by the last applied workflow transition, wins over the derived default (which changes with the place)
  const [workflowLayoutOverride, setWorkflowLayoutOverride] = useState<string | null>(null)

  const defaultLayoutId = workflowLayoutOverride ?? getDefaultLayoutId()

  return (
    <WorkflowLayoutOverrideContext.Provider value={ setWorkflowLayoutOverride }>
      <LayoutSelectionProvider
        defaultLayout={ defaultLayoutId }
        isLoading={ isLoading }
        key={ defaultLayoutId }
      >
        <EditorContainerInner
          id={ id }
        />
      </LayoutSelectionProvider>
    </WorkflowLayoutOverrideContext.Provider>
  )
}

export { EditorContainer }

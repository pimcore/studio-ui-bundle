/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import {
  ActiveTabContext, type ActiveTabContextProps,
  WidgetEditorActionsContext, type WidgetEditorActionsContextProps,
  WidgetEditorDataContext, type WidgetEditorDataContextProps
} from '../widget-editor-provider'

/** Returns only the widgets data. Re-renders when widgets array changes. */
export const useWidgetEditorData = (): WidgetEditorDataContextProps => {
  const context = useContext(WidgetEditorDataContext)

  if (context === undefined) {
    throw new Error('useWidgetEditorData must be used within a WidgetEditorProvider')
  }

  return context
}

/** Returns only action functions (setWidgets, openWidget, closeWidget, createWidget).
 *  These are stable references — this hook will NOT cause re-renders on widgets/tab changes. */
export const useWidgetEditorActions = (): WidgetEditorActionsContextProps => {
  const context = useContext(WidgetEditorActionsContext)

  if (context === undefined) {
    throw new Error('useWidgetEditorActions must be used within a WidgetEditorProvider')
  }

  return context
}

/** @deprecated Use useWidgetEditorData() + useWidgetEditorActions() for better performance.
 *  This hook subscribes to BOTH data and actions, causing re-renders on any widgets change. */
export const useWidgetEditorContext = (): WidgetEditorDataContextProps & WidgetEditorActionsContextProps => {
  const data = useWidgetEditorData()
  const actions = useWidgetEditorActions()

  return { ...data, ...actions }
}

export const useActiveTabContext = (): ActiveTabContextProps => {
  const context = useContext(ActiveTabContext)

  if (context === undefined) {
    throw new Error('useActiveTabContext must be used within a WidgetEditorProvider')
  }

  return context
}

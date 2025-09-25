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
import { WidgetEditorContext, type WidgetEditorContextProps } from '../widget-editor-provider'

export const useWidgetEditorContext = (): WidgetEditorContextProps => {
  const context = useContext(WidgetEditorContext)

  if (context === undefined) {
    throw new Error('useWidgetEditorContext must be used within a WidgetEditorProvider')
  }

  return context
}

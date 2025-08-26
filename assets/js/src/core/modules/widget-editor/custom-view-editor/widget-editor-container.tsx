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
import { WidgetEditorProvider } from './context/widget-editor-provider'
import { WidgetEditorContainerInner } from './widget-editor-container-inner'

export const WidgetEditorContainer = (): React.JSX.Element => {
  return (
    <WidgetEditorProvider>
      <WidgetEditorContainerInner />
    </WidgetEditorProvider>
  )
}

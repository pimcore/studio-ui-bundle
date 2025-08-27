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
import { PerspectiveEditorContext, type PerspectiveEditorContextProps } from '../perspective-editor-provider'

export const usePerspectiveEditorContext = (): PerspectiveEditorContextProps => {
  const context = useContext(PerspectiveEditorContext)

  if (context === undefined) {
    throw new Error('usePerspectiveEditorContext must be used within a PerspectiveEditorProvider')
  }

  return context
}

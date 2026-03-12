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
import { SelectOptionEditorContext, type SelectOptionEditorContextProps } from '../select-option-editor-provider'

export const useSelectOptionEditorContext = (): SelectOptionEditorContextProps => {
  const context = useContext(SelectOptionEditorContext)

  if (context === undefined) {
    throw new Error('useSelectOptionEditorContext must be used within a SelectOptionEditorProvider')
  }

  return context
}

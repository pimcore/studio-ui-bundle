/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DragAndDropInfo } from "@Pimcore/components/drag-and-drop/context-provider"

export interface WysiwygProps {
  value?: string | null
  onChange?: (value: string | null) => void
  disabled?: boolean
  width?: string | number
  height?: string | number
  maxCharacters?: number
  placeholder?: string
  editorConfig?: Record<string, any>
  ref?: React.Ref<WysiwygEditorRef>
}

export interface WysiwygEditorRef {
  onDrop: (info: DragAndDropInfo) => void
}

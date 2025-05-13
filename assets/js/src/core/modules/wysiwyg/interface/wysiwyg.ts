/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

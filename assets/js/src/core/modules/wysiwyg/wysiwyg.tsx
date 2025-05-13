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

import React, { useRef } from 'react'
import { type WysiwygEditorRef, type WysiwygProps } from './interface/wysiwyg'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { isValidElementType } from '../element/utils/element-type'
import WysiwygEditor from './wysiwyg-editor'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'

export const Wysiwyg = (props: WysiwygProps): React.JSX.Element => {
  const wysiwygEditorRef = useRef<WysiwygEditorRef>(null)

  return (
    <Droppable
      isValidContext={ (info: DragAndDropInfo) => props.disabled !== true && isValidElementType(info.type) }
      isValidData={ () => true }
      onDrop={ (info: DragAndDropInfo) => {
        wysiwygEditorRef.current?.onDrop?.(info)
      } }
    >
      <WysiwygEditor
        editorProps={ { ...props, ref: wysiwygEditorRef } }
      />
    </Droppable>
  )
}

export default Wysiwyg

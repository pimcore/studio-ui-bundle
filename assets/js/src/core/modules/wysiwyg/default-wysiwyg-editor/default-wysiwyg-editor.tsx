/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { type WysiwygEditorRef, type WysiwygProps } from '../interface/wysiwyg'
import { isNull } from 'lodash'
import { useStyles } from './default-wysiwyg-editor.styles'
import { toCssDimension } from '@Pimcore/utils/css'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'

export const DefaultWysiwygEditor = forwardRef<WysiwygEditorRef, WysiwygProps>(
  ({ value, onChange, disabled, width }, ref): React.JSX.Element => {
    const editorRef = useRef<HTMLDivElement>(null)
    const { styles } = useStyles()

    useImperativeHandle(ref, (): WysiwygEditorRef => ({
      onDrop: (info: DragAndDropInfo): void => {
      }
    }))

    useEffect(() => {
      if (!isNull(editorRef.current) && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value ?? ''
      }
    }, [value])

    const handleInput = (event: React.FormEvent<HTMLDivElement>): void => {
      if (onChange !== undefined && onChange !== null) {
        onChange(event.currentTarget.innerHTML)
      }
    }

    return (
      <div>
        <div
          className={ styles.editor }
          contentEditable={ disabled !== true }
          onInput={ handleInput }
          ref={ editorRef }
          style={ { maxWidth: toCssDimension(width) } }
        />
      </div>
    )
  }
)

DefaultWysiwygEditor.displayName = 'DefaultWysiwygEditor'

export default DefaultWysiwygEditor

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

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { type WysiwygEditorRef, type WysiwygProps } from '../interface/wysiwyg'
import { isNull } from 'lodash'
import { useStyles } from './default-wysiwyg-editor.styles'
import { type DragAndDropInfo } from 'src/sdk/components'

export const DefaultWysiwygEditor = forwardRef<WysiwygEditorRef, WysiwygProps>(
  ({ value, onChange, disabled }, ref): React.JSX.Element => {
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
        />
      </div>
    )
  }
)

DefaultWysiwygEditor.displayName = 'DefaultWysiwygEditor'

export default DefaultWysiwygEditor

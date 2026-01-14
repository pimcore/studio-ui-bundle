/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject, useEffect } from 'react'
import { type WysiwygProps } from './interface/wysiwyg'
import { componentConfig, ComponentRenderer } from '../app/component-registry/component-registry'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import cn from 'classnames'
import { useStyles } from '@Pimcore/modules/wysiwyg/wysiwyg.styles'
import { toCssDimension } from '@Pimcore/utils/css'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

interface WysiwygEditorProps {
  editorProps: WysiwygProps
}

export const WysiwygEditor = forwardRef(function WysiwygEditor (
  props: WysiwygEditorProps,
  ref: MutableRefObject<HTMLDivElement>
): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyles()

  useEffect(() => {
  }, [props.editorProps])

  const disabled = props.editorProps.disabled === true || (props.editorProps as any).noteditable === true

  return (
    <div
      className={ cn(styles.wysiwygEditor, ...getStateClasses(), props.editorProps.className) }
      ref={ ref }
    >
      { disabled
        ? (
          <div
            className={ cn(styles.disabledEditor, props.editorProps.className) }
            style={ {
              maxWidth: toCssDimension(props.editorProps.width),
              height: toCssDimension(props.editorProps.height)
            } }
          >
            <SanitizeHtml html={ props.editorProps.value ?? '' } />
          </div>
          )
        : (
          <ComponentRenderer
            component={ componentConfig.wysiwyg.editor.name }
            props={ { ...props.editorProps } }
          />
          ) }
    </div>
  )
})

WysiwygEditor.displayName = 'WysiwygEditor'
export default WysiwygEditor

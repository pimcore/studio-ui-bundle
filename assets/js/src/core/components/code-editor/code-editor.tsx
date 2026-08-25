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
import ReactCodeMirror, { type ReactCodeMirrorProps, EditorView } from '@uiw/react-codemirror'
import { getPresetExtensions } from '@Pimcore/components/code-editor/helpers'
import { isDarkSurface } from '@Pimcore/utils/color'
import { useStyles } from './code-editor.styles'

export type CodeEditorPreset = 'text' | 'yaml' | 'html' | 'json'

export interface CodeEditorProps extends Omit<ReactCodeMirrorProps, 'extensions' | 'value' | 'onChange'> {
  preset?: CodeEditorPreset
  extensions?: ReactCodeMirrorProps['extensions']
  value?: string
  onChange?: (value: string) => void
  lineWrapping?: boolean
}

export const CodeEditor = ({ preset, extensions, value, onChange, lineWrapping = false, theme, ...props }: CodeEditorProps): React.JSX.Element => {
  // `useStyles` hands back the shared antd token; antd-style's own `useTheme()` is
  // avoided on purpose, see the note in `modules/ant-design/styles/create-styles`.
  const { styles, theme: token } = useStyles()

  // Combine preset extensions with custom extensions
  const combinedExtensions = React.useMemo(() => {
    const presetExtensions = preset !== null && preset !== undefined ? getPresetExtensions(preset) : []
    const customExtensions = extensions ?? []
    const wrappingExtensions = lineWrapping ? [EditorView.lineWrapping] : []

    return [...presetExtensions, ...customExtensions, ...wrappingExtensions]
  }, [preset, extensions, lineWrapping])

  // Handle onChange to ensure it matches Ant Design Form expectations
  const handleChange = React.useCallback((val: string) => {
    onChange?.(val)
  }, [onChange])

  // CodeMirror ships its own colour set and defaults to the light one, which paints an
  // opaque white surface while the text colour is inherited from the theme -- on a dark
  // theme that leaves the editor white on white. The surface, caret, gutters and
  // selection are restated from the tokens in `code-editor.styles`, but the syntax
  // colours are not reachable from CSS, because CodeMirror generates opaque class names
  // for them. Selecting the built-in dark set when the surface is dark is what fixes
  // those; on a light surface the default set already reads correctly.
  //
  // An explicitly passed `theme` still wins, so a caller that already chose one keeps it.
  const resolvedTheme = theme ?? (isDarkSurface(token.colorBgContainer) ? 'dark' : 'none')

  return (
    <ReactCodeMirror
      { ...props }
      className={ styles.editor }
      extensions={ combinedExtensions }
      onChange={ handleChange }
      theme={ resolvedTheme }
      value={ value ?? '' }
    />
  )
}

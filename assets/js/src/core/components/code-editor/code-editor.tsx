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
import ReactCodeMirror, { type ReactCodeMirrorProps, EditorView, oneDarkHighlightStyle } from '@uiw/react-codemirror'
import { syntaxHighlighting } from '@codemirror/language'
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

/**
 * Colours for a dark surface, for the parts CSS cannot reach.
 *
 * Only the highlight style is taken from One Dark, not the whole `oneDark` bundle: that
 * also carries `oneDarkTheme`, whose hard-coded chrome would win over the tokens for
 * everything the stylesheet does not restate. `dark: true` is what makes CodeMirror's own
 * base themes -- search matches, tooltips, panels -- resolve their dark variants, which
 * they otherwise would not without a theme declaring itself dark.
 */
const darkSurfaceExtensions = [
  syntaxHighlighting(oneDarkHighlightStyle),
  EditorView.theme({}, { dark: true })
]

export const CodeEditor = ({ preset, extensions, value, onChange, lineWrapping = false, theme, ...props }: CodeEditorProps): React.JSX.Element => {
  // `useStyles` hands back the shared antd token; antd-style's own `useTheme()` is
  // avoided on purpose, see the note in `modules/ant-design/styles/create-styles`.
  const { styles, cx, theme: token } = useStyles()

  // CodeMirror defaults to its light colour set, which paints an opaque white surface
  // while the text colour is inherited from the Studio theme -- on a dark theme that
  // leaves the editor white on white. Opting out of that set and restating the chrome
  // from the tokens is what fixes it, so the editor follows whichever theme is active.
  //
  // A caller that supplies its own `theme` keeps it, and keeps full control of the
  // visuals: the token chrome is not applied on that path.
  const isThemeDerived = theme === undefined
  const isDarkSurfaceActive = isThemeDerived && isDarkSurface(token.colorBgContainer)

  const combinedExtensions = React.useMemo(() => {
    const presetExtensions = preset !== null && preset !== undefined ? getPresetExtensions(preset) : []
    const customExtensions = extensions ?? []
    const wrappingExtensions = lineWrapping ? [EditorView.lineWrapping] : []
    const surfaceExtensions = isDarkSurfaceActive ? darkSurfaceExtensions : []

    return [...presetExtensions, ...customExtensions, ...wrappingExtensions, ...surfaceExtensions]
  }, [preset, extensions, lineWrapping, isDarkSurfaceActive])

  // Handle onChange to ensure it matches Ant Design Form expectations
  const handleChange = React.useCallback((val: string) => {
    onChange?.(val)
  }, [onChange])

  return (
    <ReactCodeMirror
      { ...props }
      className={ cx(styles.editor, isThemeDerived && styles.themedChrome) }
      extensions={ combinedExtensions }
      onChange={ handleChange }
      theme={ theme ?? 'none' }
      value={ value ?? '' }
    />
  )
}

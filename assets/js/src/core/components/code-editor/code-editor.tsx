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
import { useCodeMirrorThemeExtensions } from '@Pimcore/components/code-editor/use-code-mirror-theme'
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
  const { styles } = useStyles()
  const themeExtensions = useCodeMirrorThemeExtensions()

  // A caller that supplies its own `theme` keeps it, and keeps control of the visuals:
  // the theme built from the Studio tokens is not applied on that path.
  const isThemeDerived = theme === undefined

  const combinedExtensions = React.useMemo(() => {
    const presetExtensions = preset !== null && preset !== undefined ? getPresetExtensions(preset) : []
    const customExtensions = extensions ?? []
    const wrappingExtensions = lineWrapping ? [EditorView.lineWrapping] : []
    const studioTheme = isThemeDerived ? themeExtensions : []

    return [...studioTheme, ...presetExtensions, ...customExtensions, ...wrappingExtensions]
  }, [preset, extensions, lineWrapping, isThemeDerived, themeExtensions])

  // Handle onChange to ensure it matches Ant Design Form expectations
  const handleChange = React.useCallback((val: string) => {
    onChange?.(val)
  }, [onChange])

  return (
    <ReactCodeMirror
      { ...props }
      className={ styles.editor }
      extensions={ combinedExtensions }
      onChange={ handleChange }
      theme={ theme ?? 'none' }
      value={ value ?? '' }
    />
  )
}

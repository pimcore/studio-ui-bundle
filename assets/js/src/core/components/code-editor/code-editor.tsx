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
import { useStyles } from './code-editor.styles'

export type CodeEditorPreset = 'text' | 'yaml' | 'html' | 'json'

export interface CodeEditorProps extends Omit<ReactCodeMirrorProps, 'extensions' | 'value' | 'onChange'> {
  preset?: CodeEditorPreset
  extensions?: ReactCodeMirrorProps['extensions']
  value?: string
  onChange?: (value: string) => void
  lineWrapping?: boolean
}

export const CodeEditor = ({ preset, extensions, value, onChange, lineWrapping = false, ...props }: CodeEditorProps): React.JSX.Element => {
  const { styles } = useStyles()

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

  return (
    <ReactCodeMirror
      { ...props }
      className={ styles.editor }
      extensions={ combinedExtensions }
      onChange={ handleChange }
      value={ value ?? '' }
    />
  )
}

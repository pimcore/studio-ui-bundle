/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty } from 'lodash'
import ReactCodeMirror, { type EditorView, type ReactCodeMirrorProps } from '@uiw/react-codemirror'
import { yaml as codeMirrorYaml } from '@codemirror/lang-yaml'
import yaml from 'js-yaml'
import { type Extension } from '@codemirror/state'
import { type Diagnostic, linter, lintGutter } from '@codemirror/lint'
import React from 'react'
import { useStyles } from './code-editor.styles'

export type CodeEditorPreset = 'text' | 'yaml'

export interface CodeEditorProps extends Omit<ReactCodeMirrorProps, 'extensions' | 'value' | 'onChange'> {
  preset?: CodeEditorPreset
  extensions?: ReactCodeMirrorProps['extensions']
  value?: string
  onChange?: (value: string) => void
}

const yamlLinter = linter((view: EditorView): Diagnostic[] => {
  const diagnostics: Diagnostic[] = []
  const content = view.state.doc.toString()

  try {
    yaml.load(content)
  } catch (error) {
    if (error instanceof Error) {
      const yamlError = error as any
      let from = 0
      let to = 0

      // Get error line and column
      if (!isEmpty(yamlError.mark)) {
        const line: number = yamlError.mark.line
        const column = yamlError.mark.column
        const lineObj = view.state.doc.line(line + 1)
        from = lineObj.from + column
        to = Math.min(from + 1, lineObj.to)
      } else if (!isEmpty(yamlError.linePos)) {
        from = yamlError.linePos[0]?.start ?? 0
        to = yamlError.linePos[0]?.end ?? from + 1
      }

      diagnostics.push({
        from,
        to,
        severity: 'error',
        message: error.message
      })
    }
  }

  return diagnostics
})

const getPresetExtensions = (preset: CodeEditorPreset): Extension[] => {
  switch (preset) {
    case 'yaml':
      return [codeMirrorYaml(), yamlLinter, lintGutter()]
    case 'text':
    default:
      return []
  }
}

export const CodeEditor = ({ preset, extensions, value, onChange, ...props }: CodeEditorProps): React.JSX.Element => {
  const { styles } = useStyles()

  // Combine preset extensions with custom extensions
  const combinedExtensions = React.useMemo(() => {
    const presetExtensions = preset !== null && preset !== undefined ? getPresetExtensions(preset) : []
    const customExtensions = extensions ?? []
    return [...presetExtensions, ...customExtensions]
  }, [preset, extensions])

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

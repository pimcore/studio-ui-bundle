/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import ReactCodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror'
import { yaml } from '@codemirror/lang-yaml'
import { type LanguageSupport } from '@codemirror/language'
import React from 'react'
import { useStyles } from './code-editor.styles'

export type CodeEditorPreset = 'text' | 'yaml'

export interface CodeEditorProps extends Omit<ReactCodeMirrorProps, 'extensions' | 'value' | 'onChange'> {
  preset?: CodeEditorPreset
  extensions?: ReactCodeMirrorProps['extensions']
  value?: string
  onChange?: (value: string) => void
}

const getPresetExtensions = (preset: CodeEditorPreset): LanguageSupport[] => {
  switch (preset) {
    case 'yaml':
      return [yaml()]
    case 'text':
    default:
      return []
  }
}

export const CodeEditor = ({ preset, extensions, value, onChange, ...props }: CodeEditorProps): React.JSX.Element => {
  const { styles } = useStyles()

  // Combine preset extensions with custom extensions
  const combinedExtensions = React.useMemo(() => {
    const presetExtensions = preset ? getPresetExtensions(preset) : []
    const customExtensions = extensions ?? []
    return [...presetExtensions, ...customExtensions]
  }, [preset, extensions])

  // Handle onChange to ensure it matches Ant Design Form expectations
  const handleChange = React.useCallback((val: string) => {
    onChange?.(val)
  }, [onChange])

  return (
    <ReactCodeMirror
      {...props}
      value={value ?? ''}
      onChange={handleChange}
      extensions={combinedExtensions}
      className={styles.editor}
    />
  )
}

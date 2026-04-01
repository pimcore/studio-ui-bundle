/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Diagnostic, linter, lintGutter } from '@codemirror/lint'
import type { EditorView } from '@uiw/react-codemirror'
import yaml from 'js-yaml'
import { isEmpty } from 'lodash'
import type { Extension } from '@codemirror/state'
import { yaml as codeMirrorYaml } from '@codemirror/lang-yaml'
import { html as codeMirrorHtml } from '@codemirror/lang-html'
import { json as codeMirrorJson, jsonParseLinter } from '@codemirror/lang-json'
import { type CodeEditorPreset } from '@Pimcore/components/code-editor/code-editor'

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
      if (!isEmpty(yamlError?.mark)) {
        const line: number = yamlError?.mark?.line
        const column = yamlError?.mark?.column
        const lineObj = view.state.doc.line(line + 1)
        from = lineObj?.from + column
        to = Math.min(from + 1, lineObj?.to)
      } else if (!isEmpty(yamlError.linePos)) {
        from = yamlError.linePos[0]?.start ?? 0
        to = yamlError.linePos[0]?.end ?? from + 1
      }

      diagnostics.push({ from, to, severity: 'error', message: error?.message })
    }
  }

  return diagnostics
})

export const getPresetExtensions = (preset: CodeEditorPreset): Extension[] => {
  switch (preset) {
    case 'yaml':
      return [codeMirrorYaml(), yamlLinter, lintGutter()]
    case 'html':
      return [codeMirrorHtml()]
    case 'json':
      return [codeMirrorJson(), linter(jsonParseLinter()), lintGutter()]
    case 'text':
    default:
      return []
  }
}

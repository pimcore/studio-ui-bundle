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

import React, { useState } from 'react'
import { useStyle } from './text-editor.styles'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/yaml/yaml.js'

interface TextEditorProps {
  defaultText?: string | undefined
  lineNumbers?: boolean
  className?: string
}
export const TextEditor = ({
  defaultText,
  lineNumbers = true,
  className
}: TextEditorProps): React.JSX.Element => {
  const [text, setText] = useState(defaultText ?? '')
  const { styles } = useStyle()

  const options = {
    mode: 'yaml',
    theme: 'idea',
    lineNumbers,
    readOnly: false
  }

  return (
    <CodeMirror
      className={ [styles.editor, className].join(' ') }
      onBeforeChange={ (editor, data, value) => {
        setText(value)
      } }
      options={ options }
      value={ text }
    />
  )
}

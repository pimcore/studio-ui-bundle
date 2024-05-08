import React, { useState } from 'react'
import { useStyle } from './text-editor.styles'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/yaml/yaml.js'

interface TextEditorProps {
  src?: string
  lineNumbers?: boolean
  className?: string
}
export const TextEditor = ({
  src,
  lineNumbers = true,
  className
}: TextEditorProps): React.JSX.Element => {
  // TODO: get content of file

  const [code, setCode] = useState('')
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
        setCode(value)
      } }
      options={ options }
      value={ code }
    />
  )
}

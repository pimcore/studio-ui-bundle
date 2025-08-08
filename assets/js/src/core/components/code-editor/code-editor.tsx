import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror"
import React from "react"
import { useStyles } from "./code-editor.styles"

export const CodeEditor = (props: ReactCodeMirrorProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <ReactCodeMirror
      {...props}
      className={styles.editor}
    />
  )
}

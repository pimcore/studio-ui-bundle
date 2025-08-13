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
import React from 'react'
import { useStyles } from './code-editor.styles'

export const CodeEditor = (props: ReactCodeMirrorProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <ReactCodeMirror
      { ...props }
      className={ styles.editor }
    />
  )
}

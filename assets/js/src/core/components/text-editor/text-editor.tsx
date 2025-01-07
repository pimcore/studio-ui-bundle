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

import React, { useEffect, useState } from 'react'
import { useStyle } from './text-editor.styles'
import ReactCodeMirror from '@uiw/react-codemirror'
import { getLanguageExtensions, type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'

interface TextEditorProps {
  defaultText?: string
  lineNumbers?: boolean
  className?: string
  language?: SupportedLanguage
}

export const TextEditor = ({
  defaultText,
  lineNumbers = true,
  className,
  language
}: TextEditorProps): React.JSX.Element => {
  const [text, setText] = useState(defaultText ?? '')
  const { styles } = useStyle()

  useEffect(() => {
    setText(defaultText ?? '')
  }, [defaultText])

  return (
    <ReactCodeMirror
      basicSetup={ {
        lineNumbers
      } }
      className={ [styles.editor, className].join(' ') }
      extensions={ getLanguageExtensions(language) }
      onChange={ (value) => {
        setText(value)
      } }
      value={ text }
    />
  )
}

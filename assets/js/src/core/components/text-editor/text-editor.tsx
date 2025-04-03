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

import React from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import cn from 'classnames'
import { getLanguageExtensions, type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'
import { useStyle } from './text-editor.styles'

interface TextEditorProps {
  lineNumbers?: boolean
  className?: string
  language?: SupportedLanguage
  textValue: string
  setTextValue: (value: string) => void
}

export const TextEditor = ({
  lineNumbers = true,
  className,
  language,
  textValue,
  setTextValue
}: TextEditorProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <ReactCodeMirror
      basicSetup={ {
        lineNumbers
      } }
      className={ cn(styles.editor, className) }
      extensions={ getLanguageExtensions(language) }
      onChange={ (value) => { setTextValue(value) } }
      value={ textValue }
    />
  )
}

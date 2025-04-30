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

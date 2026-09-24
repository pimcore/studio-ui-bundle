/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import { getLanguageExtensions } from '@Pimcore/components/text-editor/detect-language'
import { useCodeMirrorThemeExtensions } from '@Pimcore/components/code-editor/use-code-mirror-theme'
import ReactCodeMirror from '@uiw/react-codemirror'
import React from 'react'
import { useStyles } from './translation-html-preview.styles'

interface TranslationHtmlEditorProps {
  value?: string
  onChange?: (value: string) => void
}

export const TranslationHtmlPreview = ({
  value = '',
  onChange
}: TranslationHtmlEditorProps): React.JSX.Element => {
  const { styles } = useStyles()
  const themeExtensions = useCodeMirrorThemeExtensions()

  const extensions = React.useMemo(
    () => [...themeExtensions, ...getLanguageExtensions('html')],
    [themeExtensions]
  )

  return (
    <Content
      none={ false }
    >
      <ReactCodeMirror
        basicSetup={ {
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        } }
        className={ styles.codeEditor }
        extensions={ extensions }
        onChange={ onChange }
        theme="none"
        value={ value }
      />
    </Content>
  )
}

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
import ReactCodeMirror from '@uiw/react-codemirror'
import { isUndefined } from 'lodash'
import React from 'react'
import { useStyles } from './translation-html-preview.styles'

interface TranslationHtmlPreviewProps {
  value: string
}

export const TranslationHtmlPreview = ({
  value
}: TranslationHtmlPreviewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Content
      none={ isUndefined(value) || value.length === 0 }
    >
      <ReactCodeMirror
        basicSetup={ {
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        } }
        className={ styles.codeEditor }
        extensions={ getLanguageExtensions(null) }
        value={ value ?? '' }
      />
    </Content>
  )
}

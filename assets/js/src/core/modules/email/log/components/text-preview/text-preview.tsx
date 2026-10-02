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
import { type EmailLog, useEmailLogGetTextQuery } from '@Pimcore/modules/email/emails-api-slice.gen'
import ReactCodeMirror from '@uiw/react-codemirror'
import { isUndefined } from 'lodash'
import React from 'react'
import { useStyles } from './text-preview.styles'

interface TextPreviewProps {
  email: EmailLog
  hasTextLog: boolean
}

export const TextPreview = ({ email, hasTextLog }: TextPreviewProps): React.JSX.Element => {
  const { data, isLoading } = useEmailLogGetTextQuery({ id: email.id }, { skip: !hasTextLog })
  const { styles } = useStyles()
  const themeExtensions = useCodeMirrorThemeExtensions()

  const extensions = React.useMemo(
    () => [...themeExtensions, ...getLanguageExtensions('html')],
    [themeExtensions]
  )

  return (
    <Content
      loading={ isLoading }
      none={ !hasTextLog || isUndefined(data?.data) || data.data.length === 0 }
    >
      <ReactCodeMirror
        basicSetup={ {
          lineNumbers: true,
          syntaxHighlighting: true,
          searchKeymap: true
        } }
        className={ styles.codeEditor }
        extensions={ extensions }
        readOnly
        theme="none"
        value={ data?.data ?? '' }
      />
    </Content>
  )
}

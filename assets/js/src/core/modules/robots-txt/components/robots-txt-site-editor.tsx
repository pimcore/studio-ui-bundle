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
import { CodeEditor } from '@Pimcore/components/code-editor/code-editor'
import { useStyles } from './robots-txt-site-editor.styles'

interface RobotsTxtSiteEditorProps {
  content: string
  onChange: (content: string) => void
}

export const RobotsTxtSiteEditor = (props: RobotsTxtSiteEditorProps): React.JSX.Element => {
  const { content, onChange } = props
  const { styles } = useStyles()

  return (
    <div className={ styles.editorWrapper }>
      <CodeEditor
        height='100%'
        onChange={ onChange }
        preset='text'
        value={ content }
      />
    </div>
  )
}

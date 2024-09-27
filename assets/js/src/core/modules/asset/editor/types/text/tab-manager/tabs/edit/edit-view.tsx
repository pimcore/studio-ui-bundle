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
import { useStyle } from './edit-view.styles'
import { TextEditor } from '@Pimcore/components/text-editor/text-editor'
import { type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'

interface PreviewViewProps {
  src: string | undefined
  language?: SupportedLanguage
}

const EditView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src, language } = props

  return (
    <div className={ styles.preview }>
      <TextEditor
        defaultText={ src }
        language={ language }
      />
    </div>
  )
}

export { EditView }

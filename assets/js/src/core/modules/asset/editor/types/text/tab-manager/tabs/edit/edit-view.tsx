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

import React, { useState } from 'react'
import { useStyle } from './edit-view.styles'
import { TextEditor } from '@Pimcore/components/text-editor/text-editor'
import { type SupportedLanguage } from '@Pimcore/components/text-editor/detect-language'
import { type TextData } from '@Pimcore/modules/asset/draft/hooks/use-text-settings'

interface PreviewViewProps {
  src: string | undefined
  language?: SupportedLanguage
  updateTextData: (text: TextData) => void
}

const EditView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src, language, updateTextData } = props

  const [textValue, setTextValue] = useState(src ?? '')

  const handleUpdateTextValue = (value: string): void => {
    setTextValue(value)

    updateTextData(value)
  }

  return (
    <div className={ styles.preview }>
      <TextEditor
        language={ language }
        setTextValue={ handleUpdateTextValue }
        textValue={ textValue }
      />
    </div>
  )
}

export { EditView }

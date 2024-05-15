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
import { useStyle } from './preview-view.styles'
import { TextEditor } from '@Pimcore/components/text-editor/text-editor'

interface PreviewViewProps {
  src: string | undefined
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props

  return (
    <div className={ styles.preview }>
      <TextEditor
        defaultText={ src }
      />
    </div>
  )
}

export { PreviewView }

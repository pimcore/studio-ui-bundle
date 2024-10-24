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
import { useStyle } from '@Pimcore/components/pimcore-document/pimcore-document.styles'

interface PimcoreDocumentProps {
  src: string
  className?: string
}

export const PimcoreDocument = ({ src, className }: PimcoreDocumentProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ [styles['document-container'], className].join(' ') }>
      <iframe
        src={ src }
        title={ src }
      />
    </div>
  )
}

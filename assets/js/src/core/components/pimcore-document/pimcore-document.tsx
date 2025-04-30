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

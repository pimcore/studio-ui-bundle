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

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from '@Pimcore/components/data-object-preview/data-object-preview.styles'

interface DataObjectPreviewProps {
  id: number
}

export const DataObjectPreview = ({ id }: DataObjectPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <iframe
      className={ ['w-full h-full', styles.preview].join(' ') }
      src={ `${getPrefix()}/data-objects/preview/${id}` }
      title={ `${t('preview.label')}-${id}` }
    />
  )
}

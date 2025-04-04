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
import { useStyles } from '@Pimcore/components/data-object-preview/data-object-preview.styles'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DataObjectPreviewProps {
  id: number
}

export const DataObjectPreview = ({ id }: DataObjectPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const { dataObject } = useDataObjectDraft(id)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const isVisible = useElementVisible(iframeRef, true)

  useEffect(() => {
    if (isVisible) {
      setTimestamp(Date.now())
    }
  }, [dataObject?.draftData?.modificationDate, isVisible])

  return (
    <iframe
      className={ ['w-full h-full', styles.preview].join(' ') }
      ref={ iframeRef }
      src={ `${getPrefix()}/data-objects/preview/${id}?timestamp=${timestamp}` }
      title={ `${t('preview.label')}-${id}` }
    />
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Iframe } from '../iframe/iframe'

interface DataObjectPreviewProps {
  id: number
}

export const DataObjectPreview = ({ id }: DataObjectPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()
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
    <Iframe
      ref={iframeRef}
      src={`${getPrefix()}/data-objects/preview/${id}?timestamp=${timestamp}`}
      title={`${t('preview.label')}-${id}`}
    />
  )
}

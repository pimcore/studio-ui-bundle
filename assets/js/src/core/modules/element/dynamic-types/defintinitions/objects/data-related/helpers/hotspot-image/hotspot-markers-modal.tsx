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
import { useTranslation } from 'react-i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { HotspotImage, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  onClose?: () => void
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])

  const width = 952
  const height = 800

  console.log('myhots', hotspots)
  console.log(setHotspots)

  return (
    <WindowModal
      onCancel={ props.onClose }
      onOk={ props.onClose }
      open={ props.open }
      size="XL"
      title={ t('hotspot-markers-modal.title') }
    >
      <HotspotImage
        data={ hotspots }
        onRemove={ () => {} }
        onUpdate={ () => {} }
        src={ `${getPrefix()}/assets/${props.imageId}/image/stream/custom?width=${width}&height=${height}&mimeType=JPEG&resizeMode=none&contain=true` }
      />
    </WindowModal>
  )
}

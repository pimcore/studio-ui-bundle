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

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { HotspotImage, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  onClose?: () => void
  onChange?: (hotspots: IHotspot[]) => void
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])
  const [modalOpenend, setModalOpened] = useState(false)

  const width = 952
  const height = 800

  const onRemove = (id: number): void => {
    setHotspots(hotspots.filter(h => h.id !== id))
  }

  const onUpdate = (item: IHotspot): void => {
    setHotspots(hotspots.map(h => h.id === item.id ? item : h))
  }

  const handleOk = (): void => {
    props.onChange?.(hotspots)
    props.onClose?.()
  }

  const handleCancel = (): void => {
    props.onClose?.()
  }

  const afterOpenChange = (open: boolean): void => {
    setModalOpened(open)
  }

  useEffect(() => {
    setHotspots(props.hotspots ?? [])
  }, [props.hotspots])

  const thumbnailSrc = `${getPrefix()}/assets/${props.imageId}/image/stream/custom?width=${width}&height=${height}&mimeType=JPEG&resizeMode=none&contain=true`

  return (
    <WindowModal
      afterOpenChange={ afterOpenChange }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="XL"
      title={ t('hotspots.markers-modal.title') }
    >
      <HotspotImage
        data={ modalOpenend ? hotspots : [] }
        onRemove={ onRemove }
        onUpdate={ onUpdate }
        src={ thumbnailSrc }
      />
    </WindowModal>
  )
}

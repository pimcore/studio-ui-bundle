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
import { defaultStyleOptions, HotspotImage, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { Flex } from '@Pimcore/components/flex/flex'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  disabled?: boolean
  onClose?: () => void
  onChange?: (hotspots: IHotspot[]) => void
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])
  const [modalOpened, setModalOpened] = useState(false)

  const width = 952
  const height = 800

  const onClone = (id: number): void => {
    const originalHotspot = hotspots.find(h => h.id === id)
    if (originalHotspot !== undefined) {
      const newHotspot = {
        ...originalHotspot,
        id: hotspots.length + 1
      }
      setHotspots([...hotspots, newHotspot])
    }
  }

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
    setHotspots(props.hotspots ?? [])
    props.onClose?.()
  }

  const afterOpenChange = (open: boolean): void => {
    setModalOpened(open)
  }

  const addHotspot = (type: string): void => {
    const style = defaultStyleOptions[type]
    const newHotspot: IHotspot = {
      id: hotspots.length + 1,
      x: 5,
      y: 5,
      width: style.width,
      height: style.height,
      type
    }

    setHotspots(currentHotspots => [...currentHotspots, newHotspot])
  }

  const thumbnailSrc = `${getPrefix()}/assets/${props.imageId}/image/stream/custom?width=${width}&height=${height}&mimeType=JPEG&resizeMode=none&contain=true`

  return (
    <WindowModal
      afterOpenChange={ afterOpenChange }
      footer={ props.disabled === true
        ? <span></span>
        : (_, { OkBtn, CancelBtn }) => (
          <Flex
            className="w-100"
            justify="flex-end"
            style={ {
              justifyContent: 'space-between'
            } }
          >
            <ButtonGroup items={ [
              <IconTextButton
                icon={ { value: 'new-marker' } }
                key="new-marker"
                onClick={ () => { addHotspot('marker') } }
              >
                {t('hotspots.new-marker')}
              </IconTextButton>,
              <IconTextButton
                icon={ { value: 'new-hotspot' } }
                key="new-hotspot"
                onClick={ () => { addHotspot('hotspot') } }
              >
                {t('hotspots.new-hotspot')}
              </IconTextButton>
            ] }
            />
            <ButtonGroup items={ [
              <CancelBtn key="cancel" />,
              <OkBtn key="ok" />
            ] }
            />
          </Flex>
          ) }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="XL"
      title={ t('hotspots.edit') }
    >
      <HotspotImage
        data={ modalOpened ? hotspots : [] }
        onClone={ onClone }
        onRemove={ onRemove }
        onUpdate={ onUpdate }
        src={ thumbnailSrc }
      />
    </WindowModal>
  )
}

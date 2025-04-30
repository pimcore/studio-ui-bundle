/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { defaultStyleOptions, HotspotImage, type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { Flex } from '@Pimcore/components/flex/flex'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { createImageThumbnailUrl } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import {
  HotspotMarkersDataModal
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-markers-data-modal'
import { isUndefined } from 'lodash'
import { type CropSettings } from './types/crop-types'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  disabled?: boolean
  onClose?: () => void
  onChange?: (hotspots: IHotspot[]) => void
  crop?: CropSettings
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])
  const [modalOpened, setModalOpened] = useState(false)
  const [editModeHotspot, setEditModeHotspot] = useState<IHotspot | undefined>(undefined)
  const width = 952
  const height = 800

  useEffect(() => {
    setHotspots(props.hotspots ?? [])
  }, [props.hotspots?.length, JSON.stringify(props.hotspots?.map((item) => ({ name: item.name, data: item.data, id: item.id })))])

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

  const onEdit = (hotspot: IHotspot): void => {
    setEditModeHotspot(hotspots.find(h => h.id === hotspot.id))
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

  const thumbnailSrc = createImageThumbnailUrl(props.imageId, {
    width,
    height,
    mimeType: 'PNG',
    contain: true,
    ...props.crop
  })

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
      okText={ t('save') }
      onCancel={ handleCancel }
      onOk={ handleOk }
      open={ props.open }
      size="XL"
      title={ t(props.disabled === true ? 'hotspots.show' : 'hotspots.edit') }
    >
      <HotspotImage
        data={ modalOpened ? hotspots : [] }
        disableDrag={ !isUndefined(editModeHotspot) }
        disabled={ props.disabled }
        onClone={ onClone }
        onEdit={ onEdit }
        onRemove={ onRemove }
        onUpdate={ onUpdate }
        src={ thumbnailSrc }
      />
      <HotspotMarkersDataModal
        hotspot={ editModeHotspot }
        onClose={ () => { setEditModeHotspot(undefined) } }
        onUpdate={ onUpdate }
      />
    </WindowModal>
  )
}

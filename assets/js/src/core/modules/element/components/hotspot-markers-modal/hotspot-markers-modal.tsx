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
import { type MenuProps } from 'antd'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { createImageThumbnailUrl } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { HotspotMarkersDataModal } from './hotspot-markers-data-modal'
import { isNil, isUndefined } from 'lodash'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  disabled?: boolean
  onClose?: () => void
  onChange?: (hotspots: IHotspot[]) => void
  crop?: CropSettings
  predefinedDataTemplates?: string | null
}

interface DataTemplateItem {
  menuName?: string
  name: string
  data?: any[]
}

interface DataTemplates {
  marker?: DataTemplateItem[]
  hotspot?: DataTemplateItem[]
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])
  const [modalOpened, setModalOpened] = useState(false)
  const [editModeHotspot, setEditModeHotspot] = useState<IHotspot | undefined>(undefined)

  const templates: DataTemplates = React.useMemo(() => {
    if (isNil(props.predefinedDataTemplates) || props.predefinedDataTemplates === '') {
      return {}
    }
    try {
      return JSON.parse(props.predefinedDataTemplates)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse predefinedDataTemplates', e)
      return {}
    }
  }, [props.predefinedDataTemplates])

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

  const addHotspot = (type: string, template?: DataTemplateItem): void => {
    const style = defaultStyleOptions[type]
    const newHotspot: IHotspot = {
      id: hotspots.length + 1,
      x: 5,
      y: 5,
      width: style.width,
      height: style.height,
      type,
      name: template?.name,
      data: !isNil(template?.data) ? [...template.data] : undefined
    }

    setHotspots(currentHotspots => [...currentHotspots, newHotspot])
  }

  const renderAddButton = (type: 'marker' | 'hotspot'): React.JSX.Element => {
    const typeTemplates = templates[type]
    const label = t(type === 'marker' ? 'hotspots.new-marker' : 'hotspots.new-hotspot')
    const iconValue = type === 'marker' ? 'new-marker' : 'new-hotspot'

    const mainButton = (
      <IconTextButton
        icon={ { value: iconValue } }
        key={ `new-${type}-main` }
        onClick={ () => { addHotspot(type) } }
      >
        {label}
      </IconTextButton>
    )

    if (!isUndefined(typeTemplates) && typeTemplates.length > 0) {
      const items: MenuProps['items'] = typeTemplates.map((template, index) => ({
        key: index,
        label: t(template.menuName ?? template.name),
        onClick: () => { addHotspot(type, template) }
      }))

      return (
        <ButtonGroup
          items={ [
            mainButton,
            <Dropdown
              key={ `new-${type}-dropdown` }
              menu={ { items } }
              trigger={ ['click'] }
            >
              <IconButton
                icon={ { value: 'chevron-down' } }
                type="default"
              />
            </Dropdown>
          ] }
          key={ `new-${type}-group` }
          noSpacing
        />
      )
    }

    return mainButton
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
              renderAddButton('marker'),
              renderAddButton('hotspot')
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

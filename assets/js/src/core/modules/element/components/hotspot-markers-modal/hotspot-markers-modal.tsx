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
import { isNil, isString, isUndefined } from 'lodash'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type ExpandedHotspotMarkerData } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { usePathToId } from '@Pimcore/modules/element/hooks/use-path-to-id'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export interface HotspotMarkersModalProps {
  hotspots?: IHotspot[] | null
  imageId: number
  open: boolean
  disabled?: boolean
  onClose?: () => void
  onChange?: (hotspots: IHotspot[]) => void
  crop?: CropSettings
  predefinedDataTemplates?: DataTemplates | string | null
}

export interface DataTemplateItem {
  menuName?: string
  name: string
  data?: any[]
}

export interface DataTemplates {
  marker?: DataTemplateItem[]
  hotspot?: DataTemplateItem[]
}

export const HotspotMarkersModal = (props: HotspotMarkersModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { convertPathToId } = usePathToId({ trackErrors: false })

  const [hotspots, setHotspots] = useState<IHotspot[]>(props.hotspots ?? [])
  const [modalOpened, setModalOpened] = useState(false)
  const [editModeHotspot, setEditModeHotspot] = useState<IHotspot | undefined>(undefined)

  const templates: DataTemplates = React.useMemo(() => {
    if (isNil(props.predefinedDataTemplates)) {
      return {}
    }

    if (isString(props.predefinedDataTemplates)) {
      if (props.predefinedDataTemplates === '') {
        return {}
      }
      try {
        return JSON.parse(props.predefinedDataTemplates) as DataTemplates
      } catch (e) {
        console.error('Failed to parse predefinedDataTemplates', e)
        return {}
      }
    }

    return props.predefinedDataTemplates
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

  const convertPathsToIds = async (data: ExpandedHotspotMarkerData[]): Promise<ExpandedHotspotMarkerData[]> => {
    const processedData = await Promise.all(
      data.map(async (item) => {
        const isRelationType = item.type === 'asset' || item.type === 'document' || item.type === 'object'
        const itemValue = item.value

        if (isRelationType && isString(itemValue) && itemValue.startsWith('/')) {
          const elementType = mapToElementType(item.type)

          if (!isNil(elementType)) {
            const id = await convertPathToId(elementType, itemValue)

            return {
              ...item,
              value: id,
              fullPath: itemValue
            }
          }
        }

        return item
      })
    )

    return processedData
  }

  const addHotspot = (type: string, template?: DataTemplateItem): void => {
    const style = defaultStyleOptions[type]
    const hotspotId = hotspots.length + 1

    const newHotspot: IHotspot = {
      id: hotspotId,
      x: 5,
      y: 5,
      width: style.width,
      height: style.height,
      type,
      name: template?.name,
      data: template?.data
    }

    setHotspots(currentHotspots => [...currentHotspots, newHotspot])

    if (!isNil(template?.data)) {
      void convertPathsToIds(template.data as ExpandedHotspotMarkerData[]).then(processedData => {
        setHotspots(currentHotspots =>
          currentHotspots.map(h =>
            h.id === hotspotId ? { ...h, data: processedData } : h
          )
        )
      })
    }
  }

  const renderAddButton = (type: 'marker' | 'hotspot'): React.JSX.Element | null => {
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
            ].filter((item): item is React.JSX.Element => !isNil(item)) }
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

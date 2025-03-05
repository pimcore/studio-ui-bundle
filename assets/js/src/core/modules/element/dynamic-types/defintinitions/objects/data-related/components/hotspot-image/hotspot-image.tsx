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
import cn from 'classnames'
import { Card } from '@Pimcore/components/card/card'
import {
  HotspotImageFooter
} from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import type {
  ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import type {
  Hotspot,
  Marker
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import type {
  CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import {
  HotspotImagePreview
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/hotspot-image/image-preview'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import {
  hasValueData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/hotspot-image/utils/value-data'
import _ from 'lodash'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './hotspot-image.styles'

export interface HotspotImageValue {
  image: ImageValue | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

export interface HotspotImageProps {
  width: string | number | null
  height: string | number | null
  disabled?: boolean
  value?: HotspotImageValue | null
  onChange?: (value: HotspotImageValue | null) => void
  className?: string
}

export const HotspotImage = (props: HotspotImageProps): React.JSX.Element => {
  const [value, setValueState] = React.useState<HotspotImageValue | null>(props.value ?? null)
  const [markerModalOpen, setMarkerModalOpen] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const { confirm } = useFormModal()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const setValue = (newValue: HotspotImageValue | null): void => {
    if (!_.isEqual(newValue, value)) {
      setValueState(newValue)
      props.onChange?.(newValue)
    }
  }

  const emptyValue = (): void => {
    setValue(null)
  }

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  const replaceImage = (newImage: ImageValue): void => {
    if (hasValueData(value)) {
      confirm({
        title: t('hotspots.clear-data'),
        content: t('hotspots.clear-data.dnd-message'),
        okText: t('yes'),
        cancelText: t('no'),
        onOk: () => {
          setImage(newImage, true)
        },
        onCancel: () => {
          setImage(newImage, false)
        }
      })
    } else {
      setImage(newImage, true)
    }
  }

  const setImage = (image: ImageValue, replaceValueData: boolean): void => {
    let newValue: HotspotImageValue = value === null ? { image: null, hotspots: [], marker: [], crop: {} } : { ...value }

    if (replaceValueData) {
      newValue = { image, hotspots: [], marker: [], crop: {} }
    } else {
      newValue = { ...newValue, image }
    }

    setValue(newValue)
  }

  return (
    <Card
      className={ cn('max-w-full', styles.image, props.className) }
      fitContent
      footer={ <HotspotImageFooter
        disabled={ props.disabled }
        emptyValue={ emptyValue }
        key="image-footer"
        replaceImage={ replaceImage }
        setCropModalOpen={ setCropModalOpen }
        setMarkerModalOpen={ setMarkerModalOpen }
        setValue={ setValue }
        value={ value }
               /> }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => {
          const newImage: ImageValue = { type: 'asset', id: info.data.id as number }
          replaceImage(newImage)
        } }
        variant="outline"
      >
        { // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          value !== null && value?.image !== null
            ? (
              <HotspotImagePreview
                assetId={ value.image.id }
                cropModalOpen={ cropModalOpen }
                disabled={ props.disabled }
                height={ height! }
                markerModalOpen={ markerModalOpen }
                onChange={ setValue }
                setCropModalOpen={ setCropModalOpen }
                setMarkerModalOpen={ setMarkerModalOpen }
                value={ value }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty-image') }
                width={ width }
              />
              ) }
      </Droppable>
    </Card>
  )
}

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

export interface HotspotImageValue {
  image: ImageValue | null
  hotspots?: Hotspot[] | null
  marker?: Marker[] | null
  crop?: CropSettings | null
}

export interface HotspotImageProps {
  width: string | number | null
  height: string | number | null
  disabled?: boolean
  value?: HotspotImageValue | null
  onChange?: (value: HotspotImageValue | null) => void
}

export const HotspotImage = (props: HotspotImageProps): React.JSX.Element => {
  const [value, setValue] = React.useState<HotspotImageValue | null>(props.value ?? null)
  const [markerModalOpen, setMarkerModalOpen] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)

  const { t } = useTranslation()
  const emptyValue = (): void => {
    setValue(null)
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const width = props.width === null || props.width === '' ? 300 : props.width
  const height = props.height === null || props.width === '' ? 150 : props.height

  return (
    <Card
      className="max-w-full"
      fitContent
      footer={ <HotspotImageFooter
        disabled={ props.disabled }
        emptyValue={ emptyValue }
        key="image-footer"
        setCropModalOpen={ setCropModalOpen }
        setMarkerModalOpen={ setMarkerModalOpen }
        setValue={ setValue }
        value={ value }
               /> }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => { setValue({ image: { type: 'asset', id: info.data.id as number } }) } }
        variant="outline"
      >
        { // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          value !== null && value?.image !== null
            ? (
              <HotspotImagePreview
                assetId={ value.image.id }
                cropModalOpen={ cropModalOpen }
                height={ height }
                markerModalOpen={ markerModalOpen }
                onChange={ props.onChange }
                setCropModalOpen={ setCropModalOpen }
                setMarkerModalOpen={ setMarkerModalOpen }
                value={ value }
                width={ width }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty') }
                uploadIcon={ props.disabled !== true }
                width={ width }
              />
              ) }
      </Droppable>
    </Card>
  )
}

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

import React from 'react'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  HotspotImage, type HotspotImageValue, type HotspotImageProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/hotspot-image/hotspot-image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { Flex } from 'antd'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { isNil } from 'lodash'

export type ImageObjectDataDefinition = AbstractObjectDataDefinition & HotspotImageProps

export class DynamicTypeObjectDataHotspotImage extends DynamicTypeObjectDataAbstract {
  id: string = 'hotspotimage'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: ImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <HotspotImage
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: HotspotImageValue | null = props.cellProps.getValue()

    return (
      <GridCellPreviewWrapper>
        <Flex
          className='w-full'
          justify='center'
        >
          { !isNil(value) && !isNil(value.image) && (
            <ImagePreview
              assetId={ value.image.id }
              height={ 100 }
              thumbnailSettings={ value.crop ?? undefined }
              width={ 100 }
            />
          )}
        </Flex>
      </GridCellPreviewWrapper>
    )
  }
}

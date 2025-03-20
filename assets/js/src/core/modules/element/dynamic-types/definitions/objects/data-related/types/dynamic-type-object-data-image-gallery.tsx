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
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  ImageGallery, type ImageGalleryValue, type ImageGalleryProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { ImageGallery as ImageGalleryPreview } from '../../grid-cell-preview/image-gallery/image-gallery'

export type ImageObjectDataDefinition = AbstractObjectDataDefinition & ImageGalleryProps

export class DynamicTypeObjectDataImageGallery extends DynamicTypeObjectDataAbstract {
  id: string = 'imageGallery'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: ImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ImageGallery
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ImageGalleryValue | null = props.cellProps.getValue()

    return (
      <ImageGalleryPreview value={ value } />
    )
  }
}

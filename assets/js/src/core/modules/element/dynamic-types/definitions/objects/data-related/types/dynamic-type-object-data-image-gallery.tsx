/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
  supportsBatchAppendModes: boolean = true
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

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
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Image, type ImageProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Flex } from '@Pimcore/components/flex/flex'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'

export type ImageObjectDataDefinition = AbstractObjectDataDefinition & ImageProps

export class DynamicTypeObjectDataImage extends DynamicTypeObjectDataAbstract {
  id: string = 'image'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: ImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Image
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return (
      <GridCellPreviewWrapper>
        <Flex
          className='w-full'
          justify='center'
        >
          {value !== null && value !== undefined && (
            <ImagePreview
              assetId={ value.id }
              height={ 100 }
              width={ 100 }
            />
          )}
        </Flex>
      </GridCellPreviewWrapper>
    )
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 250
  }
}

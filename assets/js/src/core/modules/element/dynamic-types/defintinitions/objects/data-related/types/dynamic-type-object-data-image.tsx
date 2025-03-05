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
  Image, type ImageProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Flex } from '@Pimcore/components/flex/flex'

export type ImageObjectDataDefinition = AbstractObjectDataDefinition & ImageProps

export class DynamicTypeObjectDataImage extends DynamicTypeObjectDataAbstract {
  id: string = 'image'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return (
      <Flex
        className='w-full'
        justify='center'
      >
        { value !== null && value !== undefined && (
          <ImagePreview
            assetId={ value.id }
            height={ 100 }
            width={ 100 }
          />
        )}
      </Flex>
    )
  }

  getObjectDataComponent (props: ImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Image
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }
}

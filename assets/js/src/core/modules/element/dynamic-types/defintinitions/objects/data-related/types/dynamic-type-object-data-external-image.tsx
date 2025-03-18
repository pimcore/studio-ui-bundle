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
  type AbstractObjectDataDefinition,
  DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '../dynamic-type-object-data-abstract'

import {
  ExternalImage,
  type ExternalImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/external-image/external-image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { Flex } from 'antd'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { isEmpty, isNil } from 'lodash'

export type ExternalImageObjectDataDefinition = AbstractObjectDataDefinition & {
  previewWidth: number | null
  previewHeight: number | null
  inputWidth: number | null
}

export class DynamicTypeObjectDataExternalImage extends DynamicTypeObjectDataAbstract {
  id: string = 'externalImage'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: ExternalImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ExternalImage
        className={ props.className }
        disabled={ props.noteditable === true }
        inputWidth={ props.inputWidth }
        previewHeight={ props.previewHeight }
        previewWidth={ props.previewWidth }
        value={ props.value }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ExternalImageValue | null = props.cellProps.getValue()

    return (
      <GridCellPreviewWrapper>
        <Flex
          className='w-full'
          justify='center'
        >
          { !isNil(value) && !isEmpty(value.url) && (
          <ImagePreview
            height={ 100 }
            src={ value.url }
            width={ 100 }
          />
          )}
        </Flex>
      </GridCellPreviewWrapper>
    )
  }
}

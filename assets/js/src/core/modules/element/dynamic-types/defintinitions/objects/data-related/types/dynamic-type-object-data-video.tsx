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
  Video, type VideoValue, type VideoProps, type VideoType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/video/video'
import _, { isNil } from 'lodash'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { Flex } from '@Pimcore/components/flex/flex'
import { VideoPreview } from '../components/video/preview'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { Trans } from 'react-i18next'

export type VideoObjectDataDefinition = AbstractObjectDataDefinition & VideoProps & {
  allowedTypes?: VideoType[] | null
}

export class DynamicTypeObjectDataVideo extends DynamicTypeObjectDataAbstract {
  id: string = 'video'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: VideoObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Video
        { ...props }
        allowedVideoTypes={ _.compact(props.allowedTypes) ?? undefined }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: VideoValue | null = props.cellProps.getValue()

    return (
      <GridCellPreviewWrapper>
        <Flex
          className='w-full'
          justify='center'
        >
          { !isNil(value) && value.type === 'asset' && (
            <VideoPreview
              height={ 100 }
              value={ value }
              width={ 100 }
            />
          )}

          { !isNil(value) && value?.type !== 'asset' && (
            <span style={ { whiteSpace: 'normal' } }><Trans>video.type.{value.type}</Trans> (<Trans>video.id</Trans>: {value.data})</span>
          )}
        </Flex>
      </GridCellPreviewWrapper>
    )
  }
}

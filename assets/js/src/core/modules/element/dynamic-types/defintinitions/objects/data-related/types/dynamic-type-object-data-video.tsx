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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Video, type VideoProps, type VideoType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/video/video'
import _ from 'lodash'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type VideoObjectDataDefinition = AbstractObjectDataDefinition & VideoProps & {
  allowedTypes?: VideoType[] | null
}

export class DynamicTypeObjectDataVideo extends DynamicTypeObjectDataAbstract {
  id: string = 'video'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'

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
}

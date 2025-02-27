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
  DynamicTypeObjectDataAbstract
} from '../dynamic-type-object-data-abstract'

import {
  ExternalImage
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/external-image/external-image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type ExternalImageObjectDataDefinition = AbstractObjectDataDefinition & {
  previewWidth: number | null
  previewHeight: number | null
  inputWidth: number | null
}

export class DynamicTypeObjectDataExternalImage extends DynamicTypeObjectDataAbstract {
  id: string = 'externalImage'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'

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
}

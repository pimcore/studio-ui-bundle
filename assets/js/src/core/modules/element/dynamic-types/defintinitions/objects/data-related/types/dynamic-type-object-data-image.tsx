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
  type EditMode
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Image, type ImageProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type ImageObjectDataDefinition = AbstractObjectDataDefinition & ImageProps

export class DynamicTypeObjectDataImage extends DynamicTypeObjectDataAbstract {
  id: string = 'image'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: ImageObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Image
        { ...props }
        disabled={ props.noteditable === true }
      />
    )
  }
}

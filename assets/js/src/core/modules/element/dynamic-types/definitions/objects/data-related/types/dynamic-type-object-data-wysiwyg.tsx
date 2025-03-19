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
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'

import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type WysiwygObjectDataDefinition = AbstractObjectDataDefinition
export class DynamicTypeObjectDataWysiwyg extends DynamicTypeObjectDataAbstract {
  id: string = 'wywsiwyg'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-element'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: WysiwygObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <div>WYSIWYG editor</div>
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    return <>dummy data</>
  }
}

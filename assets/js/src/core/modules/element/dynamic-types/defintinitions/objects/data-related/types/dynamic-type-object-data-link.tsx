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
import { Link } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/link/link'
import _ from 'lodash'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type LinkObjectDataDefinition = AbstractObjectDataDefinition & {
  allowedTypes?: string[] | null
  allowedTargets?: string[] | null
  disabledFields?: string[] | null
}

export class DynamicTypeObjectDataLink extends DynamicTypeObjectDataAbstract {
  id: string = 'link'
  inheritedMaskOverlay: InheritanceOverlayType = 'manual'

  getObjectDataComponent (props: LinkObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Link
        { ...props }
        allowedTargets={ _.compact(props.allowedTargets ?? []) }
        allowedTypes={ _.compact(props.allowedTypes ?? []) }
        className={ props.className }
        disabled={ props.noteditable === true }
        disabledFields={ _.compact(props.disabledFields ?? []) }
        inherited={ props.inherited }
      />
    )
  }
}

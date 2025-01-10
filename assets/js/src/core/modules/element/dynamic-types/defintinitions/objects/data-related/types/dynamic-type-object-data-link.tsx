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

export type LinkObjectDataDefinition = AbstractObjectDataDefinition

export class DynamicTypeObjectDataLink extends DynamicTypeObjectDataAbstract {
  id: string = 'link'

  getObjectDataComponent (props: LinkObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Link
        disabled={ props.noteditable === true }
      />
    )
  }
}

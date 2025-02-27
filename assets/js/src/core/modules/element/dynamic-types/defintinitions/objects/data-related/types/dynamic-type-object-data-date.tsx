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

import {
  type AbstractDateObjectDataDefinition,
  DynamicTypeObjectDataAbstractDate
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-date'
import type React from 'react'
import {
  type AbstractObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'

export type DateObjectDataDefinition = AbstractDateObjectDataDefinition & {
  columnType: 'date' | 'bigint(20)'
}

export class DynamicTypeObjectDataDate extends DynamicTypeObjectDataAbstractDate {
  id: string = 'date'

  getObjectDataComponent (props: DateObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return super.getObjectDataComponent({
      ...props,
      className: props.className,
      respectTimezone: props.columnType === 'bigint(20)',
      outputType: 'dateString',
      outputFormat: 'YYYY-MM-DD'
    })
  }
}

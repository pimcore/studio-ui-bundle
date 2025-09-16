/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterIdComponent, type DynamicTypeFieldFilterIdProps } from '../../components/dynamic-type-field-filter-id-component'
import { injectable } from 'inversify'
import { FieldFilterFrontendType } from '../../frontendTypes'

@injectable()
export class DynamicTypeFieldFilterId extends DynamicTypeFieldFilterAbstract {
  id = 'id'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Id
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterIdProps): ReactElement<DynamicTypeFieldFilterIdProps> {
    return (
      <DynamicTypeFieldFilterIdComponent { ...props } />
    )
  }
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import React, { type ReactElement } from 'react'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'
import { FieldFilterFrontendType } from '../../frontendTypes'
import { DynamicTypeFieldFilterTextComponent, type DynamicTypeFieldFilterTextProps } from '../../components/dynamic-type-field-filter-text-component'

@injectable()
export class DynamicTypeFieldFilterFulltext extends DynamicTypeFieldFilterAbstract {
  id = 'fulltext'

  getFieldFilterType (): string {
    return FieldFilterFrontendType.Fulltext
  }

  getFieldFilterComponent (props: DynamicTypeFieldFilterTextProps): ReactElement<DynamicTypeFieldFilterTextProps> {
    return (
      <DynamicTypeFieldFilterTextComponent { ...props } />
    )
  }
}

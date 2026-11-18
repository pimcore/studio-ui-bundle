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

/**
 * For fields that have no value filter (e.g. images or geo points): they can only be searched for
 * "no value" / "any value", which hosts that support the empty operator offer.
 */
@injectable()
export class DynamicTypeFieldFilterEmptyOnly extends DynamicTypeFieldFilterAbstract {
  id = 'empty-only'

  getFieldFilterType (): string {
    return ''
  }

  isFilterAvailable (): boolean {
    return false
  }

  isEmptyFilterAvailable (): boolean {
    return true
  }

  getFieldFilterComponent (): ReactElement {
    return (
      <></>
    )
  }
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { isNil, isEmpty, isArray } from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AbstractFieldFilterDefinition {}

export abstract class DynamicTypeFieldFilterAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition>

  shouldOverrideFilterType (): boolean {
    return false
  }

  getFieldFilterType (): string {
    // This method intentionally returns an empty value to avoid duplication in classes that do not override it
    return ''
  }

  shouldApply (value: any): boolean {
    if (isNil(value) || value === '') {
      return false
    }

    if (isArray(value) && isEmpty(value)) {
      return false
    }

    return true
  }

  transformFilterToApiResponse(filter: any): any {
    return filter
  }
}

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AbstractFieldFilterDefinition {}

export abstract class DynamicTypeFieldFilterAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition>

  getFieldFilterType (): string {
    // This method intentionally returns an empty value to avoid duplication in classes that do not override it
    return ''
  }
}

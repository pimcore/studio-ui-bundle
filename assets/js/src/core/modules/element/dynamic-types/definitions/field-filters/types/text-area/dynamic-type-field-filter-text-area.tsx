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
import { DynamicTypeFieldFilterTextAreaComponent, DynamicTypeFieldFilterTextAreaProps } from '../../components/dynamic-type-field-filter-text-area-component'
import { DynamicTypeFieldFilterAbstract } from '../../dynamic-type-field-filter-abstract'

@injectable()
export class DynamicTypeFieldFilterTextArea extends DynamicTypeFieldFilterAbstract {
  id = 'textarea'

  getFieldFilterType(): string {
    return 'system.string'
  }

  getFieldFilterComponent(props: DynamicTypeFieldFilterTextAreaProps): ReactElement<DynamicTypeFieldFilterTextAreaProps> {
    return (
      <DynamicTypeFieldFilterTextAreaComponent {...props} />
    )
  }
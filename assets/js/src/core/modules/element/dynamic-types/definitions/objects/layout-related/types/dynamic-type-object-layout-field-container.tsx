/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'

import { DynamicTypeObjectLayoutAbstract } from '../dynamic-type-object-layout-abstract'
import { FieldContainer, type FieldContainerProps } from '../components/field-container/field-container'

export class DynamicTypeObjectLayoutFieldContainer extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'fieldcontainer'

  getObjectLayoutComponent (props: FieldContainerProps): React.ReactElement<FieldContainerProps> {
    return <FieldContainer { ...props } />
  }
}

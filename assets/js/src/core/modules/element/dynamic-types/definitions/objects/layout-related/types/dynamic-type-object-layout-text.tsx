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
import { Text, type TextProps } from '../components/text/text'

export class DynamicTypeObjectLayoutText extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'text'

  getObjectLayoutComponent (props: TextProps): React.ReactElement<TextProps> {
    return <Text { ...props } />
  }
}

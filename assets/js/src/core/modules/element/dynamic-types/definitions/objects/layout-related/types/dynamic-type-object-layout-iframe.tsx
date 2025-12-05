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
import { Iframe, type IframeProps } from '../components/iframe/iframe'

export class DynamicTypeObjectLayoutIframe extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'iframe'

  getObjectLayoutComponent (props: IframeProps): React.ReactElement<IframeProps> {
    return <Iframe { ...props } />
  }
}

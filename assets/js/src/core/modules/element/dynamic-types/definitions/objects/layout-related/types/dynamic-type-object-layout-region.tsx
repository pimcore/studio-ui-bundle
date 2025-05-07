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
import { Region, type RegionProps } from '../components/region/region'

export class DynamicTypeObjectLayoutRegion extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'region'

  getObjectLayoutComponent (props: RegionProps): React.ReactElement<RegionProps> {
    return <Region { ...props } />
  }
}

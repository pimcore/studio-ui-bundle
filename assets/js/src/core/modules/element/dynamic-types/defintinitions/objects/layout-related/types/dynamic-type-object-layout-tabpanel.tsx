/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'

import { DynamicTypeObjectLayoutAbstract } from '../dynamic-type-object-layout-abstract'
import { Tabpanel, type TabpanelProps } from '../components/tabpanel/tabpanel'

export class DynamicTypeObjectLayoutTabpanel extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'tabpanel'

  getObjectLayoutComponent (props: TabpanelProps): React.ReactElement<TabpanelProps> {
    return <Tabpanel { ...props } />
  }
}

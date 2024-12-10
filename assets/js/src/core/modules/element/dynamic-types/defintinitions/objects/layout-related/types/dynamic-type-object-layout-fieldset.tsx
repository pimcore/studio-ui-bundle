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
import { Panel, type PanelProps } from '../components/panel/panel'

export class DynamicTypeObjectLayoutFieldset extends DynamicTypeObjectLayoutAbstract {
  readonly id = 'fieldset'

  getObjectLayoutComponent (props: PanelProps): React.ReactElement<PanelProps> {
    return (
      <Panel
        { ...props }
        theme='fieldset'
      />
    )
  }
}

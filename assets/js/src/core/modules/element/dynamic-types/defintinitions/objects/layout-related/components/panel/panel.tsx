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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { Title } from '@Pimcore/components/title/title'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'

export interface PanelProps extends AbstractObjectLayoutDefinition {
  title: string
}

export const Panel = ({ title, name, fieldtype, children }: PanelProps): React.JSX.Element => {
  return (
    <div>
      <div style={ { border: '1px solid black', padding: 10 } }><Title>{title ?? name} (type: {fieldtype})</Title></div>
      <div style={ { border: '1px solid black', padding: 10 } }>
        {children.map((child, index) => (
          <ObjectComponent
            { ...child }
            key={ child.name }
          />
        ))}
      </div>
    </div>
  )
}

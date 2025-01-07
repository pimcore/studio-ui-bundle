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
import { Flex } from '@Pimcore/components/flex/flex'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'

export interface FieldContainerProps extends AbstractObjectLayoutDefinition {
  collapsible?: boolean
  collapsed?: boolean
}

export const FieldContainer = ({ children, collapsible, collapsed }: FieldContainerProps): React.JSX.Element => {
  return (
    <Flex
      className='w-full'
      gap={ { x: 'extra-small', y: 0 } }
    >
      {children.map((child, index) => {
        return (
          <Flex
            flex={ 1 }
            key={ index }
          >
            <ObjectComponent
              { ...child }
            />
          </Flex>
        )
      })}
    </Flex>
  )
}

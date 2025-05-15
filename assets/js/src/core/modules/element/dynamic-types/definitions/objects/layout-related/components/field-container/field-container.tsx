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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { Flex } from '@Pimcore/components/flex/flex'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'

export interface FieldContainerProps extends AbstractObjectLayoutDefinition {
  collapsible?: boolean
  collapsed?: boolean
}

export const FieldContainer = ({ children, collapsible, collapsed, noteditable }: FieldContainerProps): React.JSX.Element => {
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
              noteditable={ noteditable }
            />
          </Flex>
        )
      })}
    </Flex>
  )
}

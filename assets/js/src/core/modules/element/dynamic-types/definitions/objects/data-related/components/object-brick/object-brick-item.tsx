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
import { Content } from '@Pimcore/components/content/content'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { useObjectBrick } from './providers/use-object-brick'
import { Box } from '@Pimcore/components/box/box'

export interface ObjectBrickItemProps {
  type: string
}

export const ObjectBrickItem = (props: ObjectBrickItemProps): React.JSX.Element => {
  const objectBrick = useObjectBrick()
  const { type } = props

  // @todo handle this cases as errors
  if (type === null || objectBrick === null) {
    return <></>
  }

  const { data, isLoading } = objectBrick

  if (isLoading === true) {
    return <Content loading />
  }

  const layoutDefinition = data.items.find(item => item.key === type)

  if (layoutDefinition === undefined) {
    throw new Error(`Object brick layout definition for type ${type} not found`)
  }

  return (
    <Box padding={ { x: 'small', y: 'small', top: 'none' } }>
      {layoutDefinition.children.map((child, index) => {
        return (
          <ObjectComponent
            key={ index }
            { ...child }
          />
        )
      })}
    </Box>
  )
}

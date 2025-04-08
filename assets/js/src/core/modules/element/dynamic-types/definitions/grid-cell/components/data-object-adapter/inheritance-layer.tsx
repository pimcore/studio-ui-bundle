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

import { Box } from '@Pimcore/components/box/box'
import { InheritanceOverlay } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { InheritanceButton } from '@Pimcore/modules/data-object/components/inheritance-button'
import { Flex } from 'antd'
import React from 'react'

export interface InheritanceLayerProps {
  inherited?: boolean
  objectId?: number
  children: React.ReactNode
}

export const InheritanceLayer = (props: InheritanceLayerProps): React.JSX.Element => {
  if (props.inherited !== true || props.objectId === undefined) {
    return <>{ props.children }</>
  }

  return (
    <>
      <InheritanceOverlay
        className='w-full'
        inherited
        type="grid-cell"
      >
        {props.children}
      </InheritanceOverlay>

      <Box
        padding={ { right: 'extra-small' } }
        style={ { position: 'absolute', top: 0, bottom: 0, right: 0 } }
      >
        <Flex
          align='center'
          className='h-full'
        >
          <InheritanceButton objectId={ props.objectId } />
        </Flex>
      </Box>
    </>
  )
}

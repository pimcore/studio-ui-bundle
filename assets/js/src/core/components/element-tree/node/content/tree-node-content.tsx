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

import React, { forwardRef, type MutableRefObject } from 'react'
import { type TreeNodeProps } from '../tree-node'
import { Flex } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

const TreeNodeContent = forwardRef(function TreeNodeContent (props: TreeNodeContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { icon, label } = props.node

  return (
    <Flex
      align='center'
      gap={ 'small' }
      ref={ ref }
    >
      <Icon
        { ...icon }
        options={ { width: 16, height: 16 } }
      />
      <span className="tree-node-content__label">{label}</span>
    </Flex>
  )
})

export { TreeNodeContent }

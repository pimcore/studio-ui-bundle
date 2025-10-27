/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject } from 'react'
import { type TreeNodeProps } from '../tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './tree-node-content.styles'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { Text } from '@sdk/components'
import { isUndefined } from 'lodash'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

export interface TreeNodeContentMetaProps {
  node: TreeNodeProps
}

const TreeNodeContent = forwardRef(function TreeNodeContent (props: TreeNodeContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { icon, label, labelAddon, isPublished, elementType } = props.node
  const { styles } = useStyles()

  const getMetaSlotName = (): string => {
    switch (elementType) {
      case elementTypes.asset:
        return componentConfig.asset.tree.node.meta.name
      case elementTypes.document:
        return componentConfig.document.tree.node.meta.name
      case elementTypes.dataObject:
        return componentConfig.dataObject.tree.node.meta.name
    }
    throw new Error(`Unknown element type: ${elementType}`)
  }

  return (
    <Flex
      className={ styles.container }
      data-testid={ `tree-node-content-${props.node.id}` }
      gap={ 'mini' }
      justify='space-between'
    >
      <Flex
        align='center'
        className={ styles.containerChild }
        data-testid={ `tree-node-content-main-${props.node.id}` }
        gap={ 'small' }
        ref={ ref }
      >
        <Icon
          { ...icon }
          className={ cn({ [styles.unpublishedIcon]: isPublished === false && icon.type === 'name', [styles.unpublishedIconPath]: isPublished === false && icon.type === 'path' }) }
          data-testid={ `tree-node-icon-${props.node.id}` }
          options={ { width: 16, height: 16 } }
          subIconName={ isPublished === false ? 'eye-off' : undefined }
        />
        <span
          className="tree-node-content__label"
          data-testid={ `tree-node-label-${props.node.id}` }
        >
          {label}
          {!isUndefined(labelAddon) && (
            <Text type="secondary">
              {` ${labelAddon}`}
            </Text>
          )}
        </span>
      </Flex>

      <Flex
        align='center'
        data-testid={ `tree-node-content-meta-${props.node.id}` }
        ref={ ref }
      >
        <SlotRenderer
          props={ { node: props.node } }
          slot={ getMetaSlotName() }
        />
      </Flex>
    </Flex>
  )
})

export { TreeNodeContent }

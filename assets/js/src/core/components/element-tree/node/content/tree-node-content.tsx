/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useLayoutEffect, useRef, useState, type MutableRefObject } from 'react'
import { type TreeNodeProps } from '../tree-node'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './tree-node-content.styles'
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { Text } from '@sdk/components'
import { isNull, isUndefined } from 'lodash'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

export interface TreeNodeContentMetaProps {
  node: TreeNodeProps
}

const TreeNodeContent = forwardRef(function TreeNodeContent (props: TreeNodeContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { icon, label, labelAddon, isPublished, elementType } = props.node
  const { styles } = useStyles()
  const metaRef = useRef<HTMLDivElement>(null)
  const [containerChildMinWidth, setContainerChildMinWidth] = useState(150)

  useLayoutEffect(() => {
    if (metaRef.current !== null) {
      const metaWidth = metaRef.current.offsetWidth
      const calculatedMinWidth = Math.max(0, 150 - metaWidth)
      setContainerChildMinWidth(calculatedMinWidth)
    }
  }, [])

  const getMetaSlotName = (): string | null => {
    switch (elementType) {
      case elementTypes.asset:
        return componentConfig.asset.tree.node.meta.name
      case elementTypes.document:
        return componentConfig.document.tree.node.meta.name
      case elementTypes.dataObject:
        return componentConfig.dataObject.tree.node.meta.name
    }
    return null
  }

  const metaSlotName = getMetaSlotName()

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
        gap={ 'mini' }
        ref={ ref }
        style={ { minWidth: `${containerChildMinWidth}px` } }
      >
        <Icon
          { ...icon }
          className={ cn({ [styles.unpublishedIcon]: isPublished === false && icon.type === 'name', [styles.unpublishedIconPath]: isPublished === false && icon.type === 'path' }) }
          data-testid={ `tree-node-icon-${props.node.id}` }
          iconColorGroup="element"
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
        ref={ metaRef }
      >
        {isNull(metaSlotName)
          ? null
          : (
            <SlotRenderer
              props={ { node: props.node } }
              slot={ metaSlotName }
            />
            )}
      </Flex>
    </Flex>
  )
})

export { TreeNodeContent }

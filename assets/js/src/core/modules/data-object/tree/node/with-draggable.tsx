/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type Ref, type ReactElement } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type DataObject } from '../../data-object-api-slice-enhanced'
import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { isString, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useElementDragInfo } from '@Pimcore/components/element-tree/hooks/use-element-drag-info'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: DataObject | undefined = props.metaData.dataObject
    const { t } = useTranslation()
    const title = isString(metaData?.key) && metaData?.key !== '' ? metaData?.key : t('home')
    const resolveDragInfo = useElementDragInfo({ node: props, elementType: elementTypes.dataObject, title })

    if (props.metaData?.dataObject === undefined) {
      return (
        <Component { ...props } />
      )
    }

    return (
      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <Draggable
            info={ resolveDragInfo }
          >
            {!isUndefined(props.wrapNode) ? props.wrapNode(children) : children}
          </Draggable>
        ) }
      />
    )
  }

  return forwardRef(DraggableNodeContent)
}

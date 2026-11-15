/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, type Ref, type ComponentProps, forwardRef } from 'react'
import { Draggable } from '@Pimcore/components/drag-and-drop/draggable'
import { type Asset } from '../../asset-api-slice-enhanced'
import { type TreeNode } from '@Pimcore/components/element-tree/node/tree-node'
import { isString, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useElementDragInfo } from '@Pimcore/components/element-tree/hooks/use-element-drag-info'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: ComponentProps<typeof TreeNode>, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: Asset | undefined = props.metaData?.asset
    const { t } = useTranslation()
    const title = isString(metaData?.filename) && metaData?.filename !== '' ? metaData?.filename : t('home')
    const resolveDragInfo = useElementDragInfo({ node: props, elementType: elementTypes.asset, title })

    if (props.metaData?.asset === undefined) {
      return (
        <Component
          { ...props }
          ref={ ref }
        />
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

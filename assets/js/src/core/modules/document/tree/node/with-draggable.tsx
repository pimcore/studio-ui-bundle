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
import { type Document } from '../../document-api-slice-enhanced'
import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useTranslation } from 'react-i18next'
import { isString, isUndefined } from 'lodash'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: Document | undefined = props.metaData.document
    const { t } = useTranslation()

    if (props.metaData?.document === undefined) {
      return (
        <Component { ...props } />
      )
    }

    const title = isString(metaData?.key) && metaData?.key !== '' ? metaData?.key : t('home')

    return (
      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <Draggable
            info={ { icon: props.icon, title, type: 'document', data: { ...metaData } } }
          >
            {!isUndefined(props.wrapNode) ? props.wrapNode(children) : children}
          </Draggable>
        ) }
      />
    )
  }

  return forwardRef(DraggableNodeContent)
}

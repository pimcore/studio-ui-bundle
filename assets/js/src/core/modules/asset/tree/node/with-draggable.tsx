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
import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'

export const withDraggable = (Component: typeof TreeNode): typeof TreeNode => {
  const DraggableNodeContent = (props: ComponentProps<typeof TreeNode>, ref: Ref<HTMLDivElement>): ReactElement => {
    const metaData: Asset | undefined = props.metaData?.asset
    const { t } = useTranslation()

    if (props.metaData?.asset === undefined) {
      return (
        <Component
          { ...props }
          ref={ ref }
        />
      )
    }

    const title = isString(metaData?.filename) && metaData?.filename !== '' ? metaData?.filename : t('home')

    return (
      <Draggable
        info={ { icon: props.icon, title, type: 'asset', data: { ...metaData } } }
      >
        <Component
          { ...props }
          ref={ ref }
        />
      </Draggable>
    )
  }

  return forwardRef(DraggableNodeContent)
}

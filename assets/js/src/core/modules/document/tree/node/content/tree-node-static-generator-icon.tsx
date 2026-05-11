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
import { Icon } from '@Pimcore/components/icon/icon'
import { type TreeNodeContentMetaProps } from '@Pimcore/components/element-tree/node/content/tree-node-content'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const TreeNodeStaticGeneratorIcon = (props: TreeNodeContentMetaProps): React.JSX.Element | null => {
  const { node } = props

  if (node.elementType !== elementTypes.document || node?.metaData?.document?.staticGeneratorEnabled !== true) {
    return null
  }

  return (
    <Icon
      data-testid={ `tree-node-static-generator-icon-${node.id}` }
      options={ { width: 14, height: 14 } }
      value="page-static"
    />
  )
}

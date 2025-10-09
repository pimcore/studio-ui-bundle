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
import { useStyles } from './tree-node-content.styles'
import { type TreeNodeContentMetaProps } from './tree-node-content'
import { isEmpty, isNil } from 'lodash'

export const TreeNodeLockIcon = ({ node }: TreeNodeContentMetaProps): React.JSX.Element | null => {
  const { isLocked, locked } = node
  const { styles } = useStyles()

  if (!isLocked) {
    return null
  }

  return (
    <Icon
      className={ !isNil(locked) && !isEmpty(locked) ? '' : styles.indirectLockedIcon }
      data-testid={ `tree-node-lock-icon-${node.id}` }
      options={ { width: 14, height: 14 } }
      value='lock'
    />
  )
}

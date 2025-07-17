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
import { isEmpty, isNil } from 'lodash'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

const TreeNodeContent = forwardRef(function TreeNodeContent (props: TreeNodeContentProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { icon, label, isPublished, isLocked, locked } = props.node
  const { styles } = useStyles()

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
        >{label}</span>
      </Flex>

      <Flex
        align='center'
        data-testid={ `tree-node-content-meta-${props.node.id}` }
        gap={ 'mini' }
        ref={ ref }
      >
        {isLocked && (
          <Icon
            className={ !isNil(locked) && !isEmpty(locked) ? '' : styles.indirectLockedIcon }
            data-testid={ `tree-node-lock-icon-${props.node.id}` }
            options={ { width: 14, height: 14 } }
            value='lock'
          />
        )}
      </Flex>
    </Flex>
  )
})

export { TreeNodeContent }

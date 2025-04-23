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
      gap={ 'mini' }
      justify='space-between'
    >
      <Flex
        align='center'
        className={ styles.containerChild }
        gap={ 'small' }
        ref={ ref }
      >
        <Icon
          { ...icon }
          className={ cn({ [styles.unpublishedIcon]: isPublished === false && icon.type === 'name', [styles.unpublishedIconPath]: isPublished === false && icon.type === 'path' }) }
          options={ { width: 16, height: 16 } }
          subIconName={ isPublished === false ? 'eye-off' : undefined }
        />
        <span className="tree-node-content__label">{label}</span>
      </Flex>

      <Flex
        align='center'
        gap={ 'mini' }
        ref={ ref }
      >
        {isLocked && (
          <Icon
            className={ !isNil(locked) && !isEmpty(locked) ? '' : styles.indirectLockedIcon }
            options={ { width: 14, height: 14 } }
            value='lock'
          />
        )}
      </Flex>
    </Flex>
  )
})

export { TreeNodeContent }

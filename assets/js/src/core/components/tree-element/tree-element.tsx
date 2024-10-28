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

import React from 'react'
import { Tree as AntTree, type TreeProps } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './tree-element.styles'

interface ITreeElementProps extends TreeProps {
  withCustomSwitcherIcon?: boolean
  isHideRootChecker?: boolean
}

export const TreeElement = ({ isHideRootChecker = true, withCustomSwitcherIcon = false, ...props }: ITreeElementProps): React.JSX.Element => {
  const { styles } = useStyles({ isHideRootChecker })

  const handleCustomSwitcherIcon = (): React.JSX.Element | undefined => {
    if (!withCustomSwitcherIcon) return undefined

    return (
      <Icon
        name="chevron-down"
        options={ {
          width: 12,
          height: 12
        } }
      />
    )
  }

  return (
    <AntTree
      className={ styles.treeContainer }
      showIcon
      switcherIcon={ handleCustomSwitcherIcon }
      { ...props }
    />
  )
}

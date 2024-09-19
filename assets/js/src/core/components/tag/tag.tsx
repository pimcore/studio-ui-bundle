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

import { Tag as AntTag, TagProps as AntTagPropsProps } from 'antd'
import React from 'react'
import { useStyles } from './tag.styles'

export interface TagProps extends AntTagPropsProps {
  className: string,
}

export const Tag = ({ className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.tag, className]

  return (
    <AntTag
      className={ classes.join(' ') }
      { ...props }
    />
  )
}

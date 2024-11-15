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
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './image-target.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'

interface ImageTargetProps {
  title: string
  className?: string
  width?: number
  height?: number
}

export const ImageTarget = ({ title, width, height, className }: ImageTargetProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <Flex
      align="center"
      className={ cn(className, styles.imageTargetContainer) }
      justify="center"
      style={ { maxWidth: toCssDimension(width), height: toCssDimension(width) } }
    >
      <div className="image-target-title">{ title }</div>
    </Flex>
  )
}

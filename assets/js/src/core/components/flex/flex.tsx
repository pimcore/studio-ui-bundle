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

import { Flex as AntFlex, type FlexProps as AntFlexProps, theme } from 'antd'
import React from 'react'

export interface FlexProps extends Omit<AntFlexProps, 'gap'> {
  gap?: number | 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi'
}

const { useToken } = theme

export const Flex = ({ gap = 0, ...props }: FlexProps): React.JSX.Element => {
  const { token } = useToken()
  let internalGap = gap

  if (typeof gap === 'string') {
    internalGap = transferSizingToToken(gap)
  }

  return (
    <AntFlex
      gap={ internalGap }
      { ...props }
    />
  )

  function transferSizingToToken (sizing: string): number {
    switch (sizing) {
      case 'mini':
        return token.sizeXXS
      case 'extra-small':
        return token.sizeXS
      case 'small':
        return token.sizeSM
      case 'normal':
        return token.size
      case 'medium':
        return token.sizeMD
      case 'large':
        return token.sizeLG
      case 'extra-large':
        return token.sizeXL
      case 'maxi':
        return token.sizeXXL
      default:
        return 0
    }
  }
}

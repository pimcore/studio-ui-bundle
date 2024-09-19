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

import { theme } from 'antd'
import React from 'react'

const { useToken } = theme

const sizes = ['none', 'mini', 'extra-small', 'small', 'normal', 'medium', 'large', 'extra-large', 'maxi']

export const SpacingOverview = (): React.JSX.Element => {
  const { token } = useToken()

  const sizeTokenMap = {
    none: 0,
    mini: token.sizeXXS,
    'extra-small': token.sizeXS,
    small: token.sizeSM,
    normal: token.size,
    medium: token.sizeMD,
    large: token.sizeLG,
    'extra-large': token.sizeXL,
    maxi: token.sizeXXL
  }

  return (
    <>
      <table>
        {sizes.map((size) => (
          <tr key={ size }>
            <td>{size} ({sizeTokenMap[size]}px)</td>
            <td style={ { width: 500 } }><div style={ { width: '100%', height: sizeTokenMap[size], backgroundColor: token.colorPrimary } } /></td>
          </tr>
        ))}
      </table>
    </>
  )
}

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

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
        
      .pimcore-icon {
        color: ${token.Colors.Neutral.Icon.colorIcon};
        cursor: pointer;

        svg * {
            vector-effect: non-scaling-stroke;
        }
      }
    `
  }
})

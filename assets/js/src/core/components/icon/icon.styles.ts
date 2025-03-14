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

export const useStyles = createStyles(({ token, css }) => {
  return {
    subIcon: css`
      position: absolute;
      width: 10px;
      height: 10px;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);

      & svg {
        color: ${token.gold7};
        background: ${token.gold1};
        border-radius: ${token.borderRadiusLG}px;
      }
    `

  }
})

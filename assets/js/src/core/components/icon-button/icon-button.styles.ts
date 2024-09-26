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
    button: css`
      padding: 6px;
      height: 32px;
      width: 32px;
      line-height: 0;

      &.icon-button--theme-secondary {
        color: ${token.colorText};
      }

      &.icon-button--minimal {
        padding: 0;
        width: auto;
        height: auto;
      }
    `
  }
})

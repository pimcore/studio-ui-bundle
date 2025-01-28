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
    content: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      gap: 12px;

      &.content--padded {
        padding: ${token.paddingSM}px;
      }

      &.content--centered {
        justify-content: center;
        align-items: center;
      }
    `,

    contentFullPage: css`
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    `
  }
})

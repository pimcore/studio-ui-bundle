/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    loginPage: css`
      display: flex;
      align-items: center;
      background: url(/bundles/pimcorestudioui/img/login-bg.png) lightgray 50% / cover no-repeat;
      position: absolute;
      inset: 0;
      overflow: hidden;
    `,
    loginWidget: css`
      display: flex;
      flex-direction: column;
      width: 503px;
      height: 608px;
      flex-shrink: 0;
      border-radius: 8px;
      background: linear-gradient(335deg, rgba(255, 255, 255, 0.86) 1.72%, rgba(57, 14, 97, 0.86) 158.36%);
      padding: 83px 100px 0 100px;
      margin-left: 80px;
      
      /* Component/Button/primaryShadow */
      box-shadow: 0px 2px 0px 0px rgba(114, 46, 209, 0.10);
      
      img {
        margin-bottom: 50px
      }
    `
  }
})

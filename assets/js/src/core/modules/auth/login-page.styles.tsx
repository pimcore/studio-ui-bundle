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

interface StyleProps {
  backgroundImageUrl: string
}

export const useStyle = createStyles(({ token, css }, { backgroundImageUrl }: StyleProps) => {
  return {
    loginPage: css`
      display: flex;
      align-items: center;
      background: url(${backgroundImageUrl}) lightgray 50% / cover no-repeat;
      position: absolute;
      inset: 0;
      overflow-y: auto;
      padding: 40px 0;
    `,
    loginWidget: css`
      display: flex;
      flex-direction: column;
      width: 503px;
      min-height: 608px;
      flex-shrink: 0;
      border-radius: 8px;
      background: linear-gradient(335deg, rgba(255, 255, 255, 0.86) 1.72%, rgba(236, 232, 241, 0.86) 158.36%);
      padding: 85px 100px 85px 100px;
      margin-left: 80px;

      /* Component/Button/primaryShadow */
      box-shadow: 0px 2px 0px 0px rgba(114, 46, 209, 0.10);

      img {
        max-height: 200px;
        max-width: 100%;
        object-fit: contain;
        margin-bottom: 70px;
      }
    `
  }
})

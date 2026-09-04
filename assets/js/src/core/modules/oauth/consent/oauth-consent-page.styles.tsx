/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyle = createStyles(({ token, css }) => {
  return {
    page: css`
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      inset: 0;
      overflow-y: auto;
      padding: 40px 16px;
      background: ${token.colorBgLayout};
    `,
    card: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 460px;
      border-radius: 8px;
      background: ${token.colorBgContainer};
      border: 1px solid ${token.colorBorderSecondary};
      box-shadow: 0px 2px 0px 0px ${token.controlOutline};
      padding: 40px;
    `,
    scopeList: css`
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: ${token.paddingSM}px ${token.padding}px;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
      }
    `,
    actions: css`
      button {
        flex: 1;
      }
    `
  }
})
